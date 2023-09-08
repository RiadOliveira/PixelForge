export const getUpdatedPixelsForMinimum = (
  pixelIndex: number,
  { width: imageWidth }: HTMLCanvasElement,
  imageData: Uint8ClampedArray,
  windowArray: number[],
) => {
  let minValue = Infinity;

  for (const yOffset of windowArray) {
    const yValue = pixelIndex + yOffset * imageWidth * 4;

    for (const xOffset of windowArray) {
      const xValue = xOffset * 4;
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
