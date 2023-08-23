export const getUpdatedPixelsForSomboonkaew = (
  windowArray: number[],
  pixelIndex: number,
  imageWidth: number,
  imageData: Uint8ClampedArray,
) => {
  const sumOfWeightedRGB = [0, 0, 0];
  const windowLength = windowArray.length;

  for (const yOffset of windowArray) {
    const yValue = pixelIndex + yOffset * imageWidth * 4;

    for (const xOffset of windowArray) {
      const xValue = xOffset * 4;
      const neighborPixelIndex = Math.min(
        imageData.length - 4,
        Math.max(0, yValue + xValue),
      );

      const weight = calculateWeight(yOffset, xOffset, windowLength);
      updateSumOfWeightedRGB(
        sumOfWeightedRGB,
        imageData,
        neighborPixelIndex,
        weight,
      );
    }
  }

  return sumOfWeightedRGB.map(value =>
    Math.round(value / (windowLength * windowLength)),
  );
};

const calculateWeight = (
  yOffset: number,
  xOffset: number,
  windowLength: number,
) => {
  const distance = Math.sqrt(yOffset * yOffset + xOffset * xOffset);
  return Math.exp(-distance / (2 * windowLength * windowLength));
};

const updateSumOfWeightedRGB = (
  sumOfWeightedRGB: number[],
  imageData: Uint8ClampedArray,
  neighborPixelIndex: number,
  weight: number,
) => {
  for (let ind = 0; ind < 3; ind++) {
    sumOfWeightedRGB[ind] += imageData[neighborPixelIndex + ind] * weight;
  }
};
