import { getRGBAColorOfIndex } from 'utils/auxiliar/getRGBAColorOfIndex';

export const executeGammaCorrection = (
  [resultImageData, imageData]: Uint8ClampedArray[],
  gammaValue: number,
) => {
  for (let ind = 0; ind < imageData.length; ind++) {
    const rgbaColor = getRGBAColorOfIndex(ind);

    if (rgbaColor === 'ALPHA') resultImageData[ind] = 255;
    else {
      resultImageData[ind] = Math.pow(imageData[ind] / 255, gammaValue) * 255;
    }
  }
};
