export const getUpdatedPixelsForMinimum = (
  windowArray: number[],
  pixelIndex: number,
  imageWidth: number,
  imageData: Uint8ClampedArray,
) => {
  const windowLength = windowArray.length;
  let minValue = Infinity;

  for (let y = 0; y < windowLength; y++) {
    const yValue = pixelIndex + windowArray[y] * imageWidth * 4;

    for (let x = 0; x < windowLength; x++) {
      const xValue = windowArray[x] * 4;
      const neighborPixelIndex = yValue + xValue;

      minValue = Math.min(
        calculateMin(imageData, neighborPixelIndex),
        minValue,
      );
    }
  }

  return [minValue, minValue, minValue];
};

const calculateMin = (
  imageData: Uint8ClampedArray,
  neighborPixelIndex: number,
) => {
  let minValue = Infinity;

  [...Array(3).keys()].forEach(ind => {
    const imageValue = imageData[neighborPixelIndex + ind];
    minValue = Math.min(imageValue, minValue);
  });

  return minValue;
};
