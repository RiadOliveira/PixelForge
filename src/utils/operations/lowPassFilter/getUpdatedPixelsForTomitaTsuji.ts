export const getUpdatedPixelsForTomitaTsuji = (
  windowArray: number[],
  pixelIndex: number,
  imageWidth: number,
  imageData: Uint8ClampedArray,
) => {
  const sumOfRGBValues = [0, 0, 0];
  const windowLength = windowArray.length;

  for (const yOffset of windowArray) {
    const yValue = pixelIndex + yOffset * imageWidth * 4;

    for (const xOffset of windowArray) {
      const xValue = xOffset * 4;
      const neighborPixelIndex = Math.min(
        imageData.length - 4,
        Math.max(0, yValue + xValue),
      );

      updateSumOfRGBValues(sumOfRGBValues, imageData, neighborPixelIndex);
    }
  }

  return sumOfRGBValues.map(value =>
    Math.round(value / (windowLength * windowLength)),
  );
};

const updateSumOfRGBValues = (
  sumOfRGBValues: number[],
  imageData: Uint8ClampedArray,
  neighborPixelIndex: number,
) => {
  for (let ind = 0; ind < 3; ind++) {
    sumOfRGBValues[ind] += imageData[neighborPixelIndex + ind];
  }
};
