import { getUpdatedPixelsForAverage } from './getUpdatedPixelsForAverage';
import { LowPassFiltersKey } from 'types/operationsNames/lowPassFilters';
import { getUpdatedPixelsForMedian } from './getUpdatedPixelsForMedian';
import { getUpdatedPixelsForMaximum } from './getUpdatedPixelsForMaximum';
import { getUpdatedPixelsForMinimum } from './getUpdatedPixelsForMinimum';
import { getUpdatedPixelsForMode } from './getUpdatedPixelsForMode';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { getUpdatedPixelsForKawahara } from './getUpdatedPixelsForKawahara';
import { getUpdatedPixelsForTomitaTsuji } from './getUpdatedPixelsForTomitaTsuji';
import { getUpdatedPixelsForNagaoeMatsuyama } from './getUpdatedPixelsForNagaoeMatsuyama';
import { getUpdatedPixelsForSomboonkaew } from './getUpdatedPixelsForSomboonkaew';
import { OperationFunction } from 'types/operations/OperationFunction';

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
  KAWAHARA: getUpdatedPixelsForKawahara,
  TOMITA_TSUJI: getUpdatedPixelsForTomitaTsuji,
  NAGAOE_MATSUYAMA: getUpdatedPixelsForNagaoeMatsuyama,
  SOMBOONKAEW: getUpdatedPixelsForSomboonkaew,
};

export const executeLowPassFilter: OperationFunction<LowPassFiltersKey> = (
  [image],
  [
    {
      key,
      values: [filterSize],
    },
  ],
) => {
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  const windowArray = generateWindowArray(filterSize);
  const getUpdatedPixelsFunction = GET_UPDATED_PIXELS_FUNCTIONS[key];

  for (let ind = 0; ind < imageData.data.length; ind += 4) {
    const updatedPixels = getUpdatedPixelsFunction(
      windowArray,
      ind,
      image.width,
      imageData.data,
    );

    updatedPixels.forEach((pixel, pixelIndex) => {
      resultImageData.data[ind + pixelIndex] = pixel;
    });
    resultImageData.data[ind + 3] = imageData.data[ind + 3];
  }

  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};

const generateWindowArray = (filterSize: number) => {
  const halfFilterSize = Math.floor(filterSize / 2);

  return Array.from(
    { length: filterSize },
    (_, index) => index - halfFilterSize,
  );
};
