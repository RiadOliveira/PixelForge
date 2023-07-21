import {
  BYTEWISE_OPERATIONS,
  BytewiseOperation,
  BytewiseOperationKey,
} from 'types/BytewiseOperations';
import { ImageDataToHandleOperations } from 'types/ImageDataToHandleOperations';
import { drawImageOnCanvas } from 'utils/auxiliar/drawImageOnCanvas';
import { getImagesDataToHandleOperations } from 'utils/auxiliar/getImagesDataToHandleOperations';

export const executeBytewiseOperation = (
  images: HTMLCanvasElement[],
  operationKey: BytewiseOperationKey,
  inputValues: number[],
) => {
  const bytewiseOperation = BYTEWISE_OPERATIONS[operationKey];

  if (images.length === 1) {
    return handleOneImageOperation(
      images[0],
      bytewiseOperation,
      inputValues[0],
    );
  }

  return handleTwoImagesOperation(images, bytewiseOperation);
};

const handleOneImageOperation = (
  image: HTMLCanvasElement,
  bytewiseOperation: BytewiseOperation,
  inputValue: number,
) => {
  const resultCanvas = document.createElement('canvas');
  drawImageOnCanvas(resultCanvas, image);

  const context = resultCanvas.getContext('2d')!;
  const imageData = context.getImageData(0, 0, image.width, image.height);
  const { data } = imageData;

  for (let ind = 0; ind < data.length; ind++) {
    if ((ind + 1) % 4 === 0) continue;
    data[ind] = bytewiseOperation(data[ind], inputValue);
  }

  context.putImageData(imageData, 0, 0);
  return [resultCanvas];
};

const handleTwoImagesOperation = (
  images: HTMLCanvasElement[],
  bytewiseOperation: BytewiseOperation,
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

  handleUpdateCanvasPixels(images, resultCanvas, data, bytewiseOperation);
  context.putImageData(imageData, 0, 0);
  return [resultCanvas];
};

const handleUpdateCanvasPixels = (
  images: HTMLCanvasElement[],
  resultCanvas: HTMLCanvasElement,
  resultCanvasData: Uint8ClampedArray,
  bytewiseOperation: BytewiseOperation,
) => {
  const { width, height } = resultCanvas;
  const imagesData = getImagesDataToHandleOperations(images, resultCanvas);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const imagesIndexes = images.map((_, index) =>
        getImageIterationIndexUsingData(
          images[index].width,
          imagesData[index],
          x,
          y,
        ),
      );

      const resultCanvasIndex = (y * width + x) * 4;
      updateCanvasPixelUsingTwoImages(
        resultCanvasData,
        resultCanvasIndex,
        imagesData,
        imagesIndexes,
        bytewiseOperation,
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
  resultCanvasData: Uint8ClampedArray,
  resultCanvasIndex: number,
  [{ data: firstData }, { data: secondData }]: ImageDataToHandleOperations[],
  [firstImageIndex, secondImageIndex]: number[],
  bytewiseOperation: BytewiseOperation,
) => {
  let undefinedPixel = false;

  for (let ind = 0; ind < 3; ind++) {
    const firstImageValue = firstData[firstImageIndex + ind];
    const secondImageValue = secondData[secondImageIndex + ind];

    resultCanvasData[resultCanvasIndex + ind] = bytewiseOperation(
      firstImageValue,
      secondImageValue,
    );

    if (!undefinedPixel) {
      undefinedPixel =
        firstImageValue === undefined && secondImageValue === undefined;
    }
  }

  if (!undefinedPixel) resultCanvasData[resultCanvasIndex + 3] = 255;
};
