import { RGBValuesData } from 'types/RGBValuesData';
import { getRGBAColorOfIndex } from './getRGBAColorOfIndex';
import { RGBData } from 'types/RGBValuesData';

const MAX_RGBA_VALUE = 255;

export const transferValuesToNormalizedDataArray = (
  dataArray: Int16Array,
  normalizedArray: Uint8ClampedArray,
  rgbValuesData: RGBValuesData,
) => {
  for (let ind = 0; ind < dataArray.length; ind++) {
    const rgbaColor = getRGBAColorOfIndex(ind);

    if (rgbaColor === 'ALPHA') normalizedArray[ind] = dataArray[ind];
    else {
      normalizedArray[ind] = normalizeValue(
        dataArray[ind],
        rgbValuesData[rgbaColor],
      );
    }
  }
};

const normalizeValue = (valueToNormalize: number, { min, max }: RGBData) =>
  (MAX_RGBA_VALUE / (max - min)) * (valueToNormalize - min);
