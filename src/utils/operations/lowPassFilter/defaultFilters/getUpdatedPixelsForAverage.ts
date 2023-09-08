export const getUpdatedPixelsForAverage = (
  pixelIndex: number,
  { width: imageWidth }: HTMLCanvasElement,
  imageData: Uint8ClampedArray,
  windowArray: number[],
) => {
  let totalValue = 0;
  const windowLength = windowArray.length;

  for (const yOffset of windowArray) {
    const yValue = pixelIndex + yOffset * imageWidth * 4;

    for (const xOffset of windowArray) {
      const xValue = xOffset * 4;
      const neighborPixelIndex = yValue + xValue;

      totalValue += calculateTotalValue(imageData, neighborPixelIndex);
    }
  }
  const averageValue = Math.round(
    totalValue / (windowLength * windowLength * 3),
  );

  return [averageValue, averageValue, averageValue];
};

const calculateTotalValue = (
  imageData: Uint8ClampedArray,
  neighborPixelIndex: number,
) => {
  return [...Array(3).keys()].reduce(
    (previous, current) => previous + imageData[neighborPixelIndex + current],
    0,
  );
};
