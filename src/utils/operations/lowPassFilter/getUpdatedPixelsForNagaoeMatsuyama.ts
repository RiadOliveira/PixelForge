export const getUpdatedPixelsForNagaoeMatsuyama = (
  windowArray: number[],
  pixelIndex: number,
  imageWidth: number,
  imageData: Uint8ClampedArray,
) => {
  const averageRGBValues = [0, 0, 0];

  for (const yOffset of windowArray) {
    for (const xOffset of windowArray) {
      const yValue = pixelIndex + yOffset * imageWidth * 4;
      const xValue = xOffset * 4;
      const neighborPixelIndex = yValue + xValue;

      if (neighborPixelIndex >= 0 && neighborPixelIndex < imageData.length) {
        updateSumOfRGBValues(averageRGBValues, imageData, neighborPixelIndex);
      }
    }
  }

  return averageRGBValues.map(value =>
    Math.round(value / (windowArray.length * windowArray.length)),
  );
};

const updateSumOfRGBValues = (
  averageRGBValues: number[],
  imageData: Uint8ClampedArray,
  neighborPixelIndex: number,
) => {
  for (let ind = 0; ind < 3; ind++) {
    averageRGBValues[ind] += imageData[neighborPixelIndex + ind];
  }
};
