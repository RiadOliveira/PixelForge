import { LowPassFilterKey } from 'types/operationsNames/lowPassFilters';
import { KAWAHARA_SUB_WINDOWS_OFFSETS } from './kawaharaSubWindowsOffsets';
import { TOMITA_TSUJI_SUB_WINDOWS_OFFSETS } from './tomitaTsujiSubWindowsOffsets';
import { NAGAOE_MATSUYAMA_SUB_WINDOWS_OFFSETS } from './nagaoeMatsuyamaSubWindowsOffsets';
import { SOMBOONKAEW_SUB_WINDOWS_OFFSETS } from './somboonkaewSubWindowsOffsets';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';
import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';

const SUB_WINDOWS_OFFSETS = {
  KAWAHARA: KAWAHARA_SUB_WINDOWS_OFFSETS,
  TOMITA_TSUJI: TOMITA_TSUJI_SUB_WINDOWS_OFFSETS,
  NAGAOE_MATSUYAMA: NAGAOE_MATSUYAMA_SUB_WINDOWS_OFFSETS,
  SOMBOONKAEW: SOMBOONKAEW_SUB_WINDOWS_OFFSETS,
};

type LowPassEdgePreservingKey = keyof typeof SUB_WINDOWS_OFFSETS;

export const handleEdgePreservingFilterPixelsUpdate = (
  key: LowPassFilterKey,
  image: HTMLCanvasElement,
  [resultImageData, imageData]: Uint8ClampedArray[],
) => {
  const { width, height } = image;
  const subWindowsOffsets =
    SUB_WINDOWS_OFFSETS[key as LowPassEdgePreservingKey];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const subWindowsValues = subWindowsOffsets.map(offsets =>
        getSubWindowValues(imageData, offsets, [x, y], image),
      );

      const subWindowsVariances = subWindowsValues.map(
        calculateSubWindowVariance,
      );
      const minVarianceIndex = subWindowsVariances.indexOf(
        Math.min(...subWindowsVariances),
      );
      const averageOfLowerVarianceWindow = getAverageValueOfWindow(
        subWindowsValues[minVarianceIndex],
      );

      const pixelIndex = (y * width + x) * 4;
      fillImagePixelWithSameValues(
        averageOfLowerVarianceWindow,
        resultImageData,
        pixelIndex,
      );
    }
  }
};

const getSubWindowValues = (
  imageData: Uint8ClampedArray,
  subWindowOffsets: number[][],
  [x, y]: number[],
  { width, height }: HTMLCanvasElement,
) => {
  const subWindowValues: number[] = [];

  for (const [xOffset, yOffset] of subWindowOffsets) {
    const xValue = x + xOffset;
    const yValue = y + yOffset;

    const pixelInsideBoundaries =
      xValue >= 0 && xValue < width && yValue >= 0 && yValue < height;
    if (!pixelInsideBoundaries) continue;

    const neighborPixelIndex = (yValue * width + xValue) * 4;
    const pixelValue = getGrayValueFromImagePixel(
      imageData,
      neighborPixelIndex,
    );

    subWindowValues.push(pixelValue);
  }

  return subWindowValues;
};

const calculateSubWindowVariance = (subWindowValues: number[]) => {
  const subWindowAverage = getAverageValueOfWindow(subWindowValues);

  const varianceSum = subWindowValues.reduce(
    (prev, value) => prev + Math.pow(value - subWindowAverage, 2),
    0,
  );
  return varianceSum / subWindowValues.length;
};

const getAverageValueOfWindow = (windowValues: number[]) => {
  const windowSum = windowValues.reduce((prev, value) => prev + value, 0);
  return windowSum / windowValues.length;
};
