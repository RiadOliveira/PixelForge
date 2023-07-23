import { RGBData } from 'types/RGBValuesData';

export const MAX_RGBA_VALUE = 255;

export const normalizeValue = (
  valueToNormalize: number,
  { min, max }: RGBData,
) => (MAX_RGBA_VALUE / (max - min)) * (valueToNormalize - min);
