import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

export const handleDensitySlicingPixelsUpdate = ([
  resultData,
  imageData,
]: Uint8ClampedArray[]) => {
  for (let ind = 0; ind < imageData.length; ind += 4) {
    const grayValue = getGrayValueFromImagePixel(imageData, ind);
    const rgbaValues = [...extractRgbFromGrayValue(grayValue), 255];

    rgbaValues.forEach((value, rgbaInd) => (resultData[ind + rgbaInd] = value));
  }
};

const extractRgbFromGrayValue = (grayValue: number) => {
  const valueReduction = Math.floor(grayValue / 64);
  const grayValueMultiplier = (grayValue - valueReduction * 64) / 64;

  const increasingValue = Math.round(grayValueMultiplier * 255);
  const decreasingValue = 255 - increasingValue;

  switch (true) {
    case grayValue < 64:
      return [0, 0, increasingValue];
    case grayValue < 128:
      return [0, increasingValue, decreasingValue];
    case grayValue < 192:
      return [increasingValue, decreasingValue, 0];
    default:
      return [decreasingValue, 0, 0];
  }
};
