export const getUpdatedPixelsForMaximum = (
  windowArray: number[],
  pixelIndex: number,
  imageWidth: number,
  imageData: Uint8ClampedArray,
) => {
  const windowLength = windowArray.length;
  let maxValue = -Infinity;

  for (let y = 0; y < windowLength; y++) {
    const yValue = pixelIndex + windowArray[y] * imageWidth * 4;

    for (let x = 0; x < windowLength; x++) {
      const xValue = windowArray[x] * 4;
      const neighborPixelIndex = Math.min(
        imageData.length - 4,
        Math.max(0, yValue + xValue),
      );

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
