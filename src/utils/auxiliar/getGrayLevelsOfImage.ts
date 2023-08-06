import { GrayLevels } from 'types/operations/GrayLevels';

export const getGrayLevelsOfImage = (imageData: Uint8ClampedArray) => {
  const grayLevels = {
    min: Infinity,
    max: -Infinity,
  } as GrayLevels;

  for (let ind = 0; ind < imageData.length; ind += 4) {
    const grayValue = Math.round(
      (imageData[ind] + imageData[ind + 1] + imageData[ind + 2]) / 3,
    );

    if (grayValue < grayLevels.min) grayLevels.min = grayValue;
    else if (grayValue > grayLevels.max) grayLevels.max = grayValue;
  }

  return grayLevels;
};
