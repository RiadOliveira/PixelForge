export const getUpdatedPixelsForMedian = (
  windowArray: number[],
  pixelIndex: number,
  imageWidth: number,
  imageData: Uint8ClampedArray,
) => {
  const pixelsValues = [] as number[];

  for (const yOffset of windowArray) {
    const yValue = pixelIndex + yOffset * imageWidth * 4;

    for (const xOffset of windowArray) {
      const xValue = xOffset * 4;
      const neighborPixelIndex = yValue + xValue;

      pixelsValues.push(imageData[neighborPixelIndex]);
    }
  }
  pixelsValues.sort((first, second) => first - second);

  const middleIndex = Math.floor(pixelsValues.length / 2);
  const medianValue = pixelsValues[middleIndex];

  return [medianValue, medianValue, medianValue];
};
