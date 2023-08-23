export const getUpdatedPixelsForMaximum = (
  windowArray: number[],
  pixelIndex: number,
  imageWidth: number,
  imageData: Uint8ClampedArray,
) => {
  let maxValue = -Infinity;

  for (const yOffset of windowArray) {
    const yValue = pixelIndex + yOffset * imageWidth * 4;

    for (const xOffset of windowArray) {
      const xValue = xOffset * 4;
      const neighborPixelIndex = yValue + xValue;

      maxValue = Math.max(
        calculateMax(imageData, neighborPixelIndex),
        maxValue,
      );
    }
  }

  return [maxValue, maxValue, maxValue];
};

const calculateMax = (
  imageData: Uint8ClampedArray,
  neighborPixelIndex: number,
) => {
  let maxValue = -Infinity;

  [...Array(3).keys()].forEach(ind => {
    const imageValue = imageData[neighborPixelIndex + ind];
    maxValue = Math.max(imageValue, maxValue);
  });

  return maxValue;
};
