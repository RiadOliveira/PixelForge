import { OperationData } from 'types/operations/OperationData';
import { TransformationKey } from 'types/operationsNames/transformations';
import { multiplyMatrices } from 'utils/auxiliar/multiplyMatrices';

const GENERATE_TRANSFORMATION_MATRIX_FUNCTIONS: {
  [key in TransformationKey]: (values: number[]) => number[][];
} = {
  ROTATION: ([angle]) => {
    const angleInRadians = (angle * Math.PI) / 180;
    const angleSin = Math.sin(angleInRadians);
    const angleCos = Math.cos(angleInRadians);

    return [
      [angleCos, angleSin, 0],
      [-angleSin, angleCos, 0],
      [0, 0, 1],
    ];
  },
  TRANSLATION: ([tx, ty]) => [
    [1, 0, 0],
    [0, 1, 0],
    [tx, ty, 1],
  ],
  SCALE: ([sx, sy]) => [
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, 1],
  ],
  HORIZONTAL_REFLECTION: _ => [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  VERTICAL_REFLECTION: _ => [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, 1],
  ],
  X_SHEARING: ([shx]) => [
    [1, 0, 0],
    [shx, 1, 0],
    [0, 0, 1],
  ],
  Y_SHEARING: ([shy]) => [
    [1, shy, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
};

export const executeTransformations = (
  [image]: HTMLCanvasElement[],
  operationsData: OperationData[],
  _normalizeValues: boolean,
) => {
  const { width: imageWidth, height: imageHeight } = image;
  const resultCanvas = document.createElement('canvas');
  const context = resultCanvas.getContext('2d')!;

  const transformMatrix = generateTransformationMatrix(operationsData);
  const { width, height } = getCanvasDimensionsAfterTransformation(
    transformMatrix,
    operationsData,
    image,
  );
  resultCanvas.width = width;
  resultCanvas.height = height;

  context.transform(
    transformMatrix[0][0],
    transformMatrix[0][1],
    transformMatrix[1][0],
    transformMatrix[1][1],
    transformMatrix[2][0] + width / 2,
    transformMatrix[2][1] + height / 2,
  );

  context.drawImage(
    image,
    -imageWidth / 2,
    -imageHeight / 2,
    imageWidth,
    imageHeight,
  );
  return [resultCanvas];
};

const generateTransformationMatrix = (operationsData: OperationData[]) =>
  operationsData.reduce((previous, { key, values }, ind) => {
    const generateMatrixFunction =
      GENERATE_TRANSFORMATION_MATRIX_FUNCTIONS[key as TransformationKey];

    const currentMatrix = generateMatrixFunction(values);
    return ind === 0
      ? currentMatrix
      : multiplyMatrices(previous, currentMatrix)!;
  }, [] as number[][]);

const getCanvasDimensionsAfterTransformation = (
  transformMatrix: number[][],
  operationsData: OperationData[],
  canvas: HTMLCanvasElement,
) => {
  const translationIndex = operationsData.findIndex(
    ({ key }) => key === 'TRANSLATION',
  );
  if (translationIndex !== -1) {
    const {
      values: [xTranslation, yTranslation],
    } = operationsData[translationIndex];

    const updatedWidth = canvas.width + xTranslation * 2;
    const updatedHeight = canvas.height + yTranslation * 2;

    return {
      width: updatedWidth,
      height: updatedHeight,
    };
  }

  const { minX, maxX, minY, maxY } = getCanvasMinAndMaxCoordinates(
    transformMatrix,
    canvas,
  );
  const updatedWidth = maxX - minX;
  const updatedHeight = maxY - minY;

  const hasShearing = operationsData.some(
    ({ key }) => key === 'X_SHEARING' || key === 'Y_SHEARING',
  );
  return {
    width: !hasShearing ? updatedWidth : updatedHeight,
    height: !hasShearing ? updatedHeight : updatedWidth,
  };
};

const getCanvasMinAndMaxCoordinates = (
  [[v00, v01, v02], [v10, v11, v12], [v20, v21, v22]]: number[][],
  { width, height }: HTMLCanvasElement,
) => {
  const originalVertices = [
    [0, 0],
    [width, 0],
    [0, height],
    [width, height],
  ];

  const minAndMaxCoordinates = {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
  };

  return originalVertices.reduce(({ minX, maxX, minY, maxY }, [x, y]) => {
    const newX = v00 * x + v01 * y + v02;
    const newY = v10 * x + v11 * y + v12;
    const newZ = v20 * x + v21 * y + v22;

    const xVertex = newX / newZ;
    const yVertex = newY / newZ;

    return {
      minX: Math.min(minX, xVertex),
      maxX: Math.max(maxX, xVertex),
      minY: Math.min(minY, yVertex),
      maxY: Math.max(maxY, yVertex),
    };
  }, minAndMaxCoordinates);
};
