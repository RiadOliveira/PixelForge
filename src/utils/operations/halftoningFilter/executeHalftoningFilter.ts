import { OperationFunction } from 'types/operations/OperationFunction';
import { HalftoningFilterKey } from 'types/operationsNames/halftoningFilters';
import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

const PATTERNS_MATRICES: { [key in HalftoningFilterKey]: number[][] } = {
  DOTTED_ORDERED_2x2: [
    [0, 2],
    [3, 1],
  ],
  DOTTED_ORDERED_2x3: [
    [3, 0, 4],
    [5, 2, 1],
  ],
  DOTTED_ORDERED_3x3: [
    [6, 8, 4],
    [1, 0, 3],
    [5, 2, 7],
  ],
  FLOYD_STEINBERG: [
    [0, 0, 7],
    [3, 5, 1],
  ],
  ROGERS: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  JARVIS_JUDICE_NINKE: [
    [0, 0, 0, 7, 5],
    [3, 5, 7, 5, 3],
    [1, 3, 5, 3, 1],
  ],
  STUCKI: [
    [0, 0, 0, 8, 4],
    [2, 4, 8, 4, 2],
    [1, 2, 4, 2, 1],
  ],
  STEVENSONE_ARCE: [
    [0, 0, 0, 32, 0, 0],
    [12, 0, 26, 0, 30, 0],
    [0, 12, 0, 26, 0, 12],
    [5, 0, 12, 0, 12, 0],
  ],
};

export const executeHalftoningFilter: OperationFunction<HalftoningFilterKey> = (
  [image],
  [{ key }],
) => {
  const { width, height } = image;
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  const pattern = PATTERNS_MATRICES[key];
  const patternRows = pattern.length;
  const patternColumns = pattern[0].length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelInd = (y * width + x) * 4;

      const grayValue = getGrayValueFromImagePixel(imageData.data, pixelInd);
      const threshold = pattern[y % patternRows][x % patternColumns] * 32;

      fillImagePixelWithSameValues(
        grayValue < threshold ? 0 : 255,
        resultImageData.data,
        pixelInd,
      );
    }
  }

  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};
