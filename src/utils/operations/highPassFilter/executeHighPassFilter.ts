import { executeHightBoost } from './executeHightBoost';
import { executeOtherFilters } from './executeOtherFilters';
import { OperationFunction } from 'types/operations/OperationFunction';
import { HighPassFilterKey } from 'types/operationsNames/highPassFilters';

export const executeHighPassFilter: OperationFunction<HighPassFilterKey> = (
  [image],
  [{ key, values }],
) => {
  if (key === 'HIGHT_BOOST') return executeHightBoost(image, values[0]);
  return executeOtherFilters(image, key);
};
