import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

export const handleDottedOrderedPixelsUpdate = (
  { width, height }: HTMLCanvasElement,
  imageData: Uint8ClampedArray,
  pattern: number[][],
) => {
  const patternRows = pattern.length;
  const patternColumns = pattern[0].length;

  const patternDimensions = patternRows * patternColumns;
  const parsedPattern = pattern.map(line =>
    line.map(value => (value * 255) / patternDimensions),
  );

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = (y * width + x) * 4;
      const grayValue = getGrayValueFromImagePixel(imageData, pixelIndex);

      const threshold = parsedPattern[y % patternRows][x % patternColumns];
      fillImagePixelWithSameValues(
        grayValue > threshold ? 255 : 0,
        imageData,
        pixelIndex,
      );
    }
  }
};
