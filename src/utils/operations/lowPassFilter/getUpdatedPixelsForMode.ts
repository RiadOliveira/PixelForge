type FrequencyMap = { [key: string]: number };

export const getUpdatedPixelsForMode = (
  windowArray: number[],
  pixelIndex: number,
  imageWidth: number,
  imageData: Uint8ClampedArray,
) => {
  const colorFrequencyMap = {} as FrequencyMap;

  for (const yOffset of windowArray) {
    const yValue = pixelIndex + yOffset * imageWidth * 4;

    for (const xOffset of windowArray) {
      const xValue = xOffset * 4;
      const neighborPixelIndex = yValue + xValue;

      const colorKey = getColorFrequencyKey(imageData, neighborPixelIndex);
      colorFrequencyMap[colorKey] = (colorFrequencyMap[colorKey] ?? 0) + 1;
    }
  }

  return getModeColors(colorFrequencyMap);
};

const getColorFrequencyKey = (
  imageData: Uint8ClampedArray,
  neighborPixelIndex: number,
) => {
  return [
    imageData[neighborPixelIndex],
    imageData[neighborPixelIndex + 1],
    imageData[neighborPixelIndex + 2],
  ].join(',');
};

const getModeColors = (colorFrequencyMap: FrequencyMap) => {
  let maxColorKey = '';

  for (const colorKey in colorFrequencyMap) {
    const frequency = colorFrequencyMap[colorKey];
    const maxFrequency = colorFrequencyMap[maxColorKey] ?? 0;

    if (frequency > maxFrequency) maxColorKey = colorKey;
  }

  return maxColorKey.split(',').map(Number);
};
