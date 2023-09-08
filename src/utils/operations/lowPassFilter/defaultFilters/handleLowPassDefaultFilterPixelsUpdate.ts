import { LowPassFilterKey } from 'types/operationsNames/lowPassFilters';
import { getUpdatedPixelsForAverage } from './getUpdatedPixelsForAverage';
import { getUpdatedPixelsForMaximum } from './getUpdatedPixelsForMaximum';
import { getUpdatedPixelsForMedian } from './getUpdatedPixelsForMedian';
import { getUpdatedPixelsForMinimum } from './getUpdatedPixelsForMinimum';
import { getUpdatedPixelsForMode } from './getUpdatedPixelsForMode';

const GET_UPDATED_PIXELS_FUNCTIONS = {
  AVERAGE: getUpdatedPixelsForAverage,
  MEDIAN: getUpdatedPixelsForMedian,
  MAXIMUM: getUpdatedPixelsForMaximum,
  MINIMUM: getUpdatedPixelsForMinimum,
  MODE: getUpdatedPixelsForMode,
};

type LowPassDefaultFilterKey = keyof typeof GET_UPDATED_PIXELS_FUNCTIONS;

export const handleLowPassDefaultFilterPixelsUpdate = (
  key: LowPassFilterKey,
  image: HTMLCanvasElement,
  [resultImageData, imageData]: Uint8ClampedArray[],
  filterSize: number,
) => {
  const getUpdatedPixelsFunction =
    GET_UPDATED_PIXELS_FUNCTIONS[key as LowPassDefaultFilterKey];
  const windowArray = generateWindowArray(filterSize || 3);

  for (let ind = 0; ind < imageData.length; ind += 4) {
    const updatedPixels = getUpdatedPixelsFunction(
      ind,
      image,
      imageData,
      windowArray,
    );

    updatedPixels.forEach((pixel, pixelIndex) => {
      resultImageData[ind + pixelIndex] = pixel;
    });
    resultImageData[ind + 3] = imageData[ind + 3];
  }
};

const generateWindowArray = (filterSize: number) => {
  const halfFilterSize = Math.floor(filterSize / 2);

  return Array.from(
    { length: filterSize },
    (_, index) => index - halfFilterSize,
  );
};
