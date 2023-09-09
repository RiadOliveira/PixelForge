export const getMinAndMaxThreshold = (neighborhoodValues: number[]) => {
  const min = Math.min(...neighborhoodValues);
  const max = Math.max(...neighborhoodValues);

  return (min + max) / 2;
};
