import { NotLinearGrayscaleOperationKey } from 'types/operationsNames/notLinearGrayScale';
import { getGrayLevelsOfImage } from 'utils/auxiliar/getGrayLevelsOfImage';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

type NotLinearGrayscaleWithFunctionKey = Exclude<
  NotLinearGrayscaleOperationKey,
  'BINARY' | 'REVERSE'
>;
type NotLinearFunction = (grayValue: number) => number;
const EXPONENTIAL_BASE = 1.04;

const NOT_LINEAR_FUNCTIONS: {
  [key in NotLinearGrayscaleWithFunctionKey]: NotLinearFunction;
} = {
  LOGARITHMIC: value => Math.log2(value + 1),
  SQUARE_ROOT: value => Math.sqrt(value),
  EXPONENTIAL: value => Math.pow(EXPONENTIAL_BASE, value) + 1,
  SQUARE: value => Math.pow(value, 2),
};

export const handleNotLinearWithFunctionPixelsUpdate = (
  operationKey: NotLinearGrayscaleOperationKey,
  [resultData, imageData]: Uint8ClampedArray[],
) => {
  const { max: imageMax } = getGrayLevelsOfImage(imageData);

  const notLinearFunction =
    NOT_LINEAR_FUNCTIONS[operationKey as NotLinearGrayscaleWithFunctionKey];
  const factorA = 255 / notLinearFunction(imageMax);

  for (let ind = 0; ind < imageData.length; ind += 4) {
    const originalGrayValue = getGrayValueFromImagePixel(imageData, ind);
    const parsedGrayValue = factorA * notLinearFunction(originalGrayValue);

    for (let rgbInd = 0; rgbInd < 3; rgbInd++) {
      resultData[ind + rgbInd] = Math.round(parsedGrayValue);
    }
    resultData[ind + 3] = imageData[ind + 3];
  }
};
