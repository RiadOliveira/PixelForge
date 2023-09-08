import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { OperationFunction } from 'types/operations/OperationFunction';
import { HighPassFilterKey } from 'types/operationsNames/highPassFilters';
import { normalizeValue } from 'utils/auxiliar/normalizeValue';

const GENERATE_MASK_FUNCTIONS: {
  [key in HighPassFilterKey]: (amplificationFactor: number) => number[][];
} = {
  H1: () => [
    [0, -1, 0],
    [-1, 4, -1],
    [0, -1, 0],
  ],
  H2: () => [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ],
  M1: () => [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1],
  ],
  M2: () => [
    [1, -2, 1],
    [-2, 5, -2],
    [1, -2, 1],
  ],
  M3: () => [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ],
  HIGHT_BOOST: amplificationFactor => [
    [-1, -1, -1],
    [-1, 9 * amplificationFactor - 1, -1],
    [-1, -1, -1],
  ],
};

export const executeHighPassFilter: OperationFunction<HighPassFilterKey> = (
  [image],
  [{ key, values }],
) => {
  const {
    originalImage: {
      imageData: { data: imageData },
    },
    resultCanvas: { canvas, context, imageData: resultCanvasData },
  } = generateImageAndResultCanvasData(image);

  const operationMask = GENERATE_MASK_FUNCTIONS[key](values[0]);
  for (let ind = 0; ind < imageData.length; ind += 4) {
    const convolvedPixels = getConvolvedPixels(
      imageData,
      image.width,
      ind,
      operationMask,
    );

    convolvedPixels.forEach((pixel, i) => {
      resultCanvasData.data[ind + i] = normalizeValue(pixel);
    });
    resultCanvasData.data[ind + 3] = imageData[ind + 3];
  }

  context.putImageData(resultCanvasData, 0, 0);
  return [canvas];
};

const getConvolvedPixels = (
  imageData: Uint8ClampedArray,
  width: number,
  index: number,
  mask: number[][],
) => {
  const maskDimensions = mask.length;
  const halfDimensions = Math.floor(maskDimensions / 2);

  const pixelStartValue = index - (1 + width) * (halfDimensions * 4);
  const convolvedPixels = [0, 0, 0];

  for (let i = 0; i < maskDimensions; i++) {
    const iterationValue = pixelStartValue + i * width * 4;

    for (let j = 0; j < maskDimensions; j++) {
      const pixelIndex = iterationValue + j * 4;

      if (pixelIndex >= 0 && pixelIndex < imageData.length) {
        convolvedPixels.forEach((_, c) => {
          convolvedPixels[c] += imageData[pixelIndex + c] * mask[i][j];
        });
      }
    }
  }

  return convolvedPixels;
};
