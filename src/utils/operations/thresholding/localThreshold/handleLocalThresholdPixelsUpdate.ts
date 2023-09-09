import { OperationData } from 'types/operations/OperationData';
import { ThresholdingOperationKey } from 'types/operationsNames/thresholding';
import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';
import { getAverageThreshold } from './getAverageThreshold';
import { getMedianThreshold } from './getMedianThreshold';
import { getMinAndMaxThreshold } from './getMinAndMaxThreshold';
import { getNiblackThreshold } from './getNiblackThreshold';

type LocalThresholdOperationKey = Exclude<ThresholdingOperationKey, 'GLOBAL'>;
type GetThresholdFunction = (
  neighborhoodValues: number[],
  weightingFactor: number,
) => number;

const GET_THRESHOLD_FUNCTIONS: {
  [key in LocalThresholdOperationKey]: GetThresholdFunction;
} = {
  LOCAL_AVERAGE: getAverageThreshold,
  LOCAL_MEDIAN: getMedianThreshold,
  LOCAL_MIN_MAX: getMinAndMaxThreshold,
  LOCAL_NIBLACK: getNiblackThreshold,
};

export const handleLocalThresholdPixelsUpdate = (
  { key, values }: OperationData,
  image: HTMLCanvasElement,
  [resultImageData, imageData]: Uint8ClampedArray[],
) => {
  const [windowSize, weightingFactor] = values;
  const getThresholdFunction =
    GET_THRESHOLD_FUNCTIONS[key as LocalThresholdOperationKey];

  for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
      const neighborhoodValues = getNeighborhoodValues(
        imageData,
        [x, y],
        image,
        windowSize || 3,
      );
      const threshold = getThresholdFunction(
        neighborhoodValues,
        weightingFactor || -0.2,
      );

      const pixelIndex = (y * image.width + x) * 4;
      const grayValue = getGrayValueFromImagePixel(imageData, pixelIndex);

      fillImagePixelWithSameValues(
        grayValue <= threshold ? 0 : 255,
        resultImageData,
        pixelIndex,
      );
    }
  }
};

const getNeighborhoodValues = (
  imageData: Uint8ClampedArray,
  [x, y]: number[],
  { width, height }: HTMLCanvasElement,
  windowSize: number,
) => {
  const offsetBase = Math.floor(windowSize / 2);
  const neighborhoodValues = [];

  for (let xOffset = -offsetBase; xOffset <= offsetBase; xOffset++) {
    for (let yOffset = -offsetBase; yOffset <= offsetBase; yOffset++) {
      const xValue = x + xOffset;
      const yValue = y + yOffset;

      const pixelInsideBoundaries =
        xValue >= 0 && xValue < width && yValue >= 0 && yValue < height;
      if (!pixelInsideBoundaries) continue;

      const neighborPixelIndex = (yValue * width + xValue) * 4;
      const grayValue = getGrayValueFromImagePixel(
        imageData,
        neighborPixelIndex,
      );
      neighborhoodValues.push(grayValue);
    }
  }

  return neighborhoodValues;
};
