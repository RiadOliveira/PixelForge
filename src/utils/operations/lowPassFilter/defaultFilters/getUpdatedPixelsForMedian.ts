export const getUpdatedPixelsForMedian = (
  pixelIndex: number,
  { width: imageWidth }: HTMLCanvasElement,
  imageData: Uint8ClampedArray,
  windowArray: number[],
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
