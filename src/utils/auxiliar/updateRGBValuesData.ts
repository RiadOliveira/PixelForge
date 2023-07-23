import { RGBKey } from 'types/RGBAIndexes';
import { RGBValuesData } from 'types/RGBValuesData';

export const updateRGBValuesData = (
  rgbValuesData: RGBValuesData | undefined,
  rgbColor: RGBKey,
  updateValue: number,
) => {
  if (rgbValuesData === undefined) return;

  const colorData = rgbValuesData[rgbColor];
  const { min, max } = colorData;

  if (updateValue < min) colorData.min = updateValue;
  else if (updateValue > max) colorData.max = updateValue;
};
