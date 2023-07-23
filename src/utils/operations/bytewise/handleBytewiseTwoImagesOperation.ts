import { BytewiseOperation } from 'types/BytewiseOperations';
import { ImageDataToHandleOperations } from 'types/ImageDataToHandleOperations';
import { RGBKey } from 'types/RGBAIndexes';
import { RGBValuesData } from 'types/RGBValuesData';
import { generateDefaultRGBValuesData } from 'utils/auxiliar/generateDefaultRGBValuesData';
import { getImagesDataToHandleOperations } from 'utils/auxiliar/getImagesDataToHandleOperations';
import { getRGBAColorOfIndex } from 'utils/auxiliar/getRGBAColorOfIndex';
import { transferValuesToNormalizedDataArray } from 'utils/auxiliar/transferValuesToNormalizedDataArray';
import { updateRGBValuesData } from 'utils/auxiliar/updateRGBValuesData';

export const handleBytewiseTwoImagesOperation = (
  images: HTMLCanvasElement[],
  bytewiseOperation: BytewiseOperation,
  normalizeValues: boolean,
) => {
  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = Math.max(images[0].width, images[1].width);
  resultCanvas.height = Math.max(images[0].height, images[1].height);

  const context = resultCanvas.getContext('2d')!;
  const imageData = context.getImageData(
    0,
    0,
    resultCanvas.width,
    resultCanvas.height,
  );
  const { data } = imageData;

  handleUpdateCanvas(
    [resultCanvas, ...images],
    data,
    bytewiseOperation,
    normalizeValues,
  );
  context.putImageData(imageData, 0, 0);
  return [resultCanvas];
};

const handleUpdateCanvas = (
  [resultCanvas, firstImage, secondImage]: HTMLCanvasElement[],
  resultCanvasData: Uint8ClampedArray,
  bytewiseOperation: BytewiseOperation,
  normalizeValues: boolean,
) => {
  const { length } = resultCanvasData;

  const imagesData = getImagesDataToHandleOperations(
    [firstImage, secondImage],
    resultCanvas,
  );
  const dataArray = normalizeValues ? new Int16Array(length) : resultCanvasData;
  const rgbValuesData = normalizeValues
    ? generateDefaultRGBValuesData()
    : undefined;

  handleUpdateCanvasPixelsValues(
    [resultCanvas, firstImage, secondImage],
    imagesData,
    dataArray,
    rgbValuesData,
    bytewiseOperation,
  );

  if (normalizeValues) {
    transferValuesToNormalizedDataArray(
      dataArray as Int16Array,
      resultCanvasData,
      rgbValuesData!,
    );
  }
};

const handleUpdateCanvasPixelsValues = (
  [resultCanvas, firstImage, secondImage]: HTMLCanvasElement[],
  [firstImageData, secondImageData]: ImageDataToHandleOperations[],
  dataArray: Uint8ClampedArray | Int16Array,
  rgbValuesData: RGBValuesData | undefined,
  bytewiseOperation: BytewiseOperation,
) => {
  const { width, height } = resultCanvas;
  const canvasAndImagesData = [
    dataArray,
    firstImageData.data,
    secondImageData.data,
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const firstImageIndex = getImageIterationIndexUsingData(
        firstImage.width,
        firstImageData,
        x,
        y,
      );
      const secondImageIndex = getImageIterationIndexUsingData(
        secondImage.width,
        secondImageData,
        x,
        y,
      );

      const resultCanvasIndex = (y * width + x) * 4;
      const canvasAndImagesIndexes = [
        resultCanvasIndex,
        firstImageIndex,
        secondImageIndex,
      ];

      updateCanvasPixelUsingTwoImages(
        canvasAndImagesData,
        canvasAndImagesIndexes,
        bytewiseOperation,
        rgbValuesData,
      );
    }
  }
};

const getImageIterationIndexUsingData = (
  imageWidth: number,
  {
    extremityPoints: { startX, endX, startY, endY },
  }: ImageDataToHandleOperations,
  iterationX: number,
  iterationY: number,
) => {
  if (
    iterationX >= startX &&
    iterationX <= endX &&
    iterationY >= startY &&
    iterationY <= endY
  ) {
    const parsedX = iterationX - startX;
    const parsedY = iterationY - startY;

    return (parsedY * imageWidth + parsedX) * 4;
  }

  // -3 in order to return undefined when used as index of rgb array
  return -3;
};

const updateCanvasPixelUsingTwoImages = (
  [resultCanvasData, firstImageData, secondImageData]: (
    | Uint8ClampedArray
    | Int16Array
  )[],
  [resultCanvasIndex, firstImageIndex, secondImageIndex]: number[],
  bytewiseOperation: BytewiseOperation,
  rgbValuesData?: RGBValuesData,
) => {
  let undefinedPixel = false;

  for (let ind = 0; ind < 3; ind++) {
    const firstImageValue = firstImageData[firstImageIndex + ind];
    const secondImageValue = secondImageData[secondImageIndex + ind];

    const iterationValue = bytewiseOperation(firstImageValue, secondImageValue);
    resultCanvasData[resultCanvasIndex + ind] = iterationValue;

    updateRGBValuesData(
      rgbValuesData,
      getRGBAColorOfIndex(ind) as RGBKey,
      iterationValue,
    );

    if (!undefinedPixel) {
      undefinedPixel =
        firstImageValue === undefined && secondImageValue === undefined;
    }
  }

  if (!undefinedPixel) resultCanvasData[resultCanvasIndex + 3] = 255;
};
