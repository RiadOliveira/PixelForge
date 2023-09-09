export const getMedianThreshold = (neighborhoodValues: number[]) => {
  const sortedValues = neighborhoodValues.toSorted((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 !== 0) return sortedValues[middle];
  return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
};
