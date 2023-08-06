import { GrayLevels } from 'types/operations/GrayLevels';
import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

export const handleByPartsPixelsUpdate = (
  [resultData, imageData]: Uint8ClampedArray[],
  intervals: number[][],
  { min: imageMin }: GrayLevels,
  factorsA: number[],
) => {
  for (let ind = 0; ind < imageData.length; ind += 4) {
    const originalGrayValue = getGrayValueFromImagePixel(imageData, ind);
    const intervalIndex = intervals.findIndex(
      ([min, max]) => originalGrayValue >= min && originalGrayValue <= max,
    );

    if (intervalIndex === -1) {
      copyPixelsFromOriginalImage([resultData, imageData], ind);
    } else {
      const [min] = intervals[intervalIndex];
      const factorA = factorsA[intervalIndex];

      const parsedGrayValue = Math.round(
        factorA * (originalGrayValue - imageMin) + min,
      );
      fillImagePixelWithSameValues(parsedGrayValue, resultData, ind);
    }
  }
};

const copyPixelsFromOriginalImage = (
  [resultData, imageData]: Uint8ClampedArray[],
  index: number,
) => {
  for (let rgbaInd = 0; rgbaInd < 4; rgbaInd++) {
    resultData[index + rgbaInd] = imageData[index + rgbaInd];
  }
};
