import { OperationData } from 'types/operations/OperationData';
import { TransformationKey } from 'types/operationsNames/transformations';
import { multiplyMatrices } from 'utils/auxiliar/multiplyMatrices';

const GENERATE_TRANSFORMATION_MATRIX_FUNCTIONS: {
  [key in TransformationKey]: (
    values: number[],
    image: HTMLCanvasElement,
  ) => number[][];
} = {
  ROTATION: ([angle], _) => {
    const angleInRadians = (angle * Math.PI) / 180;
    const angleSin = Math.sin(angleInRadians);
    const angleCos = Math.cos(angleInRadians);

    return [
      [angleCos, angleSin, 0],
      [-angleSin, angleCos, 0],
      [0, 0, 1],
    ];
  },
  TRANSLATION: ([tx, ty], _) => [
    [1, 0, 0],
    [0, 1, 0],
    [tx, ty, 1],
  ],
  SCALE: ([sx, sy], _) => [
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, 1],
  ],
  HORIZONTAL_REFLECTION: (_, { width }) => [
    [-1, 0, 0],
    [0, 1, 0],
    [width, 0, 1],
  ],
  VERTICAL_REFLECTION: (_, { height }) => [
    [1, 0, 0],
    [0, -1, 0],
    [0, height, 1],
  ],
  X_SHEARING: ([shx], _) => [
    [1, 0, 0],
    [shx, 1, 0],
    [0, 0, 1],
  ],
  Y_SHEARING: ([shy], _) => [
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
  const { width, height } = image;

  const newCanvas = document.createElement('canvas');
  const context = newCanvas.getContext('2d')!;
  newCanvas.width = width;
  newCanvas.height = height;

  const transformMatrix = generateFinalTransformationMatrix(
    operationsData,
    image,
  );
  context.transform(
    transformMatrix[0][0],
    transformMatrix[0][1],
    transformMatrix[1][0],
    transformMatrix[1][1],
    transformMatrix[2][0],
    transformMatrix[2][1],
  );

  context.drawImage(image, 0, 0, width, height);
  return [newCanvas];
};

const generateFinalTransformationMatrix = (
  operationsData: OperationData[],
  image: HTMLCanvasElement,
) =>
  operationsData.reduce((previous, { key, values }, ind) => {
    const generateMatrixFunction =
      GENERATE_TRANSFORMATION_MATRIX_FUNCTIONS[key as TransformationKey];

    const currentMatrix = generateMatrixFunction(values, image);
    return ind === 0
      ? currentMatrix
      : multiplyMatrices(previous, currentMatrix)!;
  }, [] as number[][]);
