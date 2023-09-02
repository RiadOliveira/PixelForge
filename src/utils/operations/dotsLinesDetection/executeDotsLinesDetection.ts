import { OperationFunction } from 'types/operations/OperationFunction';
import { DotsLinesDetectionKey } from 'types/operationsNames/dotsLinesDetection';
import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

const HIGHLIGHT_COLOR_RGBA = [0, 0, 0, 255];

const DETECTION_MASKS: { [key in DotsLinesDetectionKey]: number[][] } = {
  DOTS: [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ],
  HORIZONTAL_LINES: [
    [-1, -1, -1],
    [2, 2, 2],
    [-1, -1, -1],
  ],
  VERTICAL_LINES: [
    [-1, 2, -1],
    [-1, 2, -1],
    [-1, 2, -1],
  ],
  LINES_45_DEGREES: [
    [-1, -1, 2],
    [-1, 2, -1],
    [2, -1, -1],
  ],
  LINES_135_DEGREES: [
    [2, -1, -1],
    [-1, 2, -1],
    [-1, -1, 2],
  ],
};

export const executeDotsLinesDetection: OperationFunction<
  DotsLinesDetectionKey
> = (
  [image],
  [
    {
      key,
      values: [threshold],
    },
  ],
) => {
  const { width, height } = image;
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  const mask = DETECTION_MASKS[key];
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const convolutionResult = getConvolutionResult(
        mask,
        [x, y],
        width,
        imageData.data,
      );

      const pixelIndex = (y * width + x) * 4;
      updateResultImageData(
        resultImageData.data,
        convolutionResult > threshold,
        pixelIndex,
      );
    }
  }

  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};

const getConvolutionResult = (
  mask: number[][],
  [x, y]: number[],
  width: number,
  imageData: Uint8ClampedArray,
) => {
  let convolutionResult = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const maskValue = mask[i + 1][j + 1];
      const neighborIndex = ((y + i) * width + x + j) * 4;

      const grayValue = getGrayValueFromImagePixel(imageData, neighborIndex);
      convolutionResult += maskValue * grayValue;
    }
  }

  return Math.abs(convolutionResult);
};

const updateResultImageData = (
  resultImageData: Uint8ClampedArray,
  convolutionBiggerThanThreshold: boolean,
  pixelIndex: number,
) => {
  if (convolutionBiggerThanThreshold) {
    HIGHLIGHT_COLOR_RGBA.forEach((color, ind) => {
      resultImageData[pixelIndex + ind] = color;
    });
  } else fillImagePixelWithSameValues(255, resultImageData, pixelIndex);
};
