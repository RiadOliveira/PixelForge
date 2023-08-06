export const fillImagePixelWithSameValues = (
  value: number,
  imageData: Uint8ClampedArray,
  pixelIndex: number,
) => {
  for (let rgbInd = 0; rgbInd < 3; rgbInd++) {
    imageData[pixelIndex + rgbInd] = value;
  }
  imageData[pixelIndex + 3] = 255;
};
