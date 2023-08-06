import { rgbToHsb } from 'utils/auxiliar/rgbConversions';
import { hsv } from 'color-convert';

export const handleColorRedistributionPixelsUpdate = ([
  resultData,
  imageData,
]: Uint8ClampedArray[]) => {
  for (let ind = 0; ind < imageData.length; ind += 4) {
    const [h, s, b] = rgbToHsb([
      imageData[ind],
      imageData[ind + 1],
      imageData[ind + 2],
    ]);

    const rgbaValues = [...hsv.rgb([h, s * 1.8, b * 1.5]), 255];
    rgbaValues.forEach((value, rgbaInd) => (resultData[ind + rgbaInd] = value));
  }
};
