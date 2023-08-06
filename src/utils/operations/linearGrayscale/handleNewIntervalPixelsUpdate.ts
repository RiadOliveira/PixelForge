import { GrayLevels } from 'types/operations/GrayLevels';
import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

export const handleNewIntervalPixelsUpdate = (
  [resultData, imageData]: Uint8ClampedArray[],
  [[min]]: number[][],
  imageGrayLevels: GrayLevels,
  [factorA]: number[],
) => {
  const { min: imageMin } = imageGrayLevels;

  for (let ind = 0; ind < imageData.length; ind += 4) {
    const originalGrayValue = getGrayValueFromImagePixel(imageData, ind);
    const parsedGrayValue = Math.round(
      factorA * (originalGrayValue - imageMin) + min,
    );

    fillImagePixelWithSameValues(parsedGrayValue, resultData, ind);
  }
};
