export const getGrayValueFromImagePixel = (
  imageData: Uint8ClampedArray,
  pixelIndex: number,
) => {
  let grayValue = 0;

  for (let rgbInd = 0; rgbInd < 3; rgbInd++) {
    grayValue += imageData[pixelIndex + rgbInd];
  }
  return Math.round(grayValue / 3);
};
