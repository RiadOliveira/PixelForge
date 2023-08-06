import { OperationData } from 'types/operations/OperationData';
import { NotLinearGrayscaleOperationKey } from 'types/operationsNames/notLinearGrayScale';
import { getGrayLevelsOfImage } from 'utils/auxiliar/getGrayLevelsOfImage';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

type NotLinearFunction = (grayValue: number) => number;
const EXPONENTIAL_BASE = 1.04;

const NOT_LINEAR_FUNCTIONS: {
  [key in NotLinearGrayscaleOperationKey]: NotLinearFunction;
} = {
  LOGARITHMIC: value => Math.log2(value + 1),
  SQUARE_ROOT: value => Math.sqrt(value),
  EXPONENTIAL: value => Math.pow(EXPONENTIAL_BASE, value) + 1,
  SQUARE: value => Math.pow(value, 2),
};

export const executeNotLinearGrayscaleOperation = (
  [image]: HTMLCanvasElement[],
  [{ key }]: OperationData[],
  _normalizeValues: boolean,
) => {
  const { width, height } = image;

  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = width;
  resultCanvas.height = height;

  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(0, 0, width, height);

  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(0, 0, width, height);

  handleUpdatePixels(key as NotLinearGrayscaleOperationKey, [
    resultImageData.data,
    imageData,
  ]);
  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};

const handleUpdatePixels = (
  operationKey: NotLinearGrayscaleOperationKey,
  [resultData, imageData]: Uint8ClampedArray[],
) => {
  const { max: imageMax } = getGrayLevelsOfImage(imageData);

  const notLinearFunction = NOT_LINEAR_FUNCTIONS[operationKey];
  const factorA = 255 / notLinearFunction(imageMax);

  for (let ind = 0; ind < imageData.length; ind += 4) {
    const originalGrayValue = getGrayValueFromImagePixel(imageData, ind);
    const parsedGrayValue = factorA * notLinearFunction(originalGrayValue);

    for (let rgbInd = 0; rgbInd < 3; rgbInd++) {
      resultData[ind + rgbInd] = Math.round(parsedGrayValue);
    }
    resultData[ind + 3] = 255;
  }
};
