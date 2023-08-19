export const getUpdatedPixelsForMedian = (
  windowArray: number[],
  pixelIndex: number,
  imageWidth: number,
  imageData: Uint8ClampedArray,
) => {
  const windowLength = windowArray.length;
  const pixelsValues = [] as number[];

  for (let y = 0; y < windowLength; y++) {
    const yValue = pixelIndex + windowArray[y] * imageWidth * 4;

    for (let x = 0; x < windowLength; x++) {
      const xValue = windowArray[x] * 4;
      const neighborPixelIndex = Math.min(
        imageData.length - 4,
        Math.max(0, yValue + xValue),
      );

      pixelsValues.push(imageData[neighborPixelIndex]);
    }
  }
  pixelsValues.sort((first, second) => first - second);

  const middleIndex = Math.floor(pixelsValues.length / 2);
  const medianValue = pixelsValues[middleIndex];

  return [medianValue, medianValue, medianValue];
};
