import { OperationData } from 'types/operations/OperationData';
import { getUpdatedPixelsForAverage } from './getUpdatedPixelsForAverage';
import { LowPassFiltersKey } from 'types/operationsNames/lowPassFilters';
import { getUpdatedPixelsForMedian } from './getUpdatedPixelsForMedian';
import { getUpdatedPixelsForMaximum } from './getUpdatedPixelsForMaximum';
import { getUpdatedPixelsForMinimum } from './getUpdatedPixelsForMinimum';
import { getUpdatedPixelsForMode } from './getUpdatedPixelsForMode';

type GetUpdatedPixelsFunction = (
  windowArray: number[],
  pixelIndex: number,
  imageWidth: number,
  imageData: Uint8ClampedArray,
) => number[];

const GET_UPDATED_PIXELS_FUNCTIONS: {
  [key in LowPassFiltersKey]: GetUpdatedPixelsFunction;
} = {
  AVERAGE: getUpdatedPixelsForAverage,
  MEDIAN: getUpdatedPixelsForMedian,
  MAXIMUM: getUpdatedPixelsForMaximum,
  MINIMUM: getUpdatedPixelsForMinimum,
  MODE: getUpdatedPixelsForMode,
};

export const executeLowPassFilter = (
  [image]: HTMLCanvasElement[],
  [
    {
      key,
      values: [filterSize],
    },
  ]: OperationData[],
) => {
  const { width, height } = image;

  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = width;
  resultCanvas.height = height;

  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(0, 0, width, height);
  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(0, 0, width, height);

  const windowArray = generateWindowArray(filterSize);
  const getUpdatedPixelsFunction =
    GET_UPDATED_PIXELS_FUNCTIONS[key as LowPassFiltersKey];

  for (let ind = 0; ind < imageData.length; ind += 4) {
    const updatedPixels = getUpdatedPixelsFunction(
      windowArray,
      ind,
      width,
      imageData,
    );

    updatedPixels.forEach(
      (pixel, pixelIndex) => (resultImageData.data[ind + pixelIndex] = pixel),
    );
    resultImageData.data[ind + 3] = 255;
  }

  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};

const generateWindowArray = (filterSize: number) => {
  const halfFilterSize = Math.floor(filterSize / 2);

  return Array.from(
    { length: filterSize },
    (_, index) => index - halfFilterSize,
  );
};
