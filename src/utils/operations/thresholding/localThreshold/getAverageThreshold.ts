export const getAverageThreshold = (neighborhoodValues: number[]) => {
  const sum = neighborhoodValues.reduce((prev, value) => prev + value, 0);
  return sum / neighborhoodValues.length;
};
