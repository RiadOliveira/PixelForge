import { executeHightBoost } from './executeHightBoost';
import { executeOtherFilters } from './executeOtherFilters';
import { OperationFunction } from 'types/operations/OperationFunction';
import { HighPassFiltersKey } from 'types/operationsNames/highPassFilters';

export const executeHighPassFilter: OperationFunction<HighPassFiltersKey> = (
  [image],
  [{ key, values }],
) => {
  if (key === 'HIGHT_BOOST') return executeHightBoost(image, values[0]);
  return executeOtherFilters(image, key);
};
