import { drawImageOnCanvas } from 'utils/auxiliar/drawImageOnCanvas';
import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';
import { normalizeValue } from 'utils/auxiliar/normalizeValue';

export const handleErrorDiffusionPixelsUpdate = (
  originalImage: HTMLCanvasElement,
  imageData: Uint8ClampedArray,
  pattern: number[][],
) => {
  const { width, height } = originalImage;

  const auxiliarImage = document.createElement('canvas');
  drawImageOnCanvas(originalImage, auxiliarImage);
  const context = auxiliarImage.getContext('2d')!;
  const { data: auxiliarData } = context.getImageData(0, 0, width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = (y * width + x) * 4;
      const oldValue = getGrayValueFromImagePixel(auxiliarData, pixelIndex);

      const updatedValue = oldValue < 128 ? 0 : 255;
      fillImagePixelWithSameValues(updatedValue, imageData, pixelIndex);

      const error = oldValue - updatedValue;
      updateAuxiliarDataNeighborPixels(auxiliarData, pattern, error, [
        x,
        y,
        width,
        height,
      ]);
    }
  }
};

const updateAuxiliarDataNeighborPixels = (
  auxiliarData: Uint8ClampedArray,
  pattern: number[][],
  error: number,
  [x, y, width, height]: number[],
) => {
  const patternHeight = pattern.length;
  const patternWidth = pattern[0].length;
  const referentialX = Math.ceil(patternWidth / 2) - 1;

  for (let offsetY = 0; offsetY < patternHeight; offsetY++) {
    for (let offsetX = 0; offsetX < patternWidth; offsetX++) {
      const errorFraction = pattern[offsetY][offsetX];
      if (errorFraction === 0) continue;

      const neighborX = x + (offsetX - referentialX);
      const neighborY = y + offsetY;

      const pixelInsideBoundaries =
        neighborX >= 0 &&
        neighborX < width &&
        neighborY >= 0 &&
        neighborY < height;
      if (!pixelInsideBoundaries) continue;

      const neighborIndex = (neighborY * width + neighborX) * 4;
      const oldValue = getGrayValueFromImagePixel(auxiliarData, neighborIndex);

      const parsedValue = normalizeValue(oldValue + error * errorFraction);
      fillImagePixelWithSameValues(parsedValue, auxiliarData, neighborIndex);
    }
  }
};
