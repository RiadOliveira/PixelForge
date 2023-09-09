import { getAverageThreshold } from './getAverageThreshold';

export const getNiblackThreshold = (
  neighborhoodValues: number[],
  weightingFactor: number,
) => {
  const mean = getAverageThreshold(neighborhoodValues);

  const squaredDifferencesSum = neighborhoodValues.reduce(
    (prev, value) => prev + Math.pow(value - mean, 2),
    0,
  );
  const standardDeviation = Math.sqrt(
    squaredDifferencesSum / neighborhoodValues.length,
  );

  return mean + weightingFactor * standardDeviation;
};
