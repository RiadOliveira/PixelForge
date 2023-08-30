import { OperationData } from 'types/operations/OperationData';
import { executeHightBoost } from './executeHightBoost';
import { executeOtherFilters } from './executeOtherFilters';

export const executeHighPassFilter = (
  [image]: HTMLCanvasElement[],
  [{ key, values }]: OperationData[],
) => {
  if (key === 'HIGHT_BOOST') return executeHightBoost(image, values[0]);
  return executeOtherFilters(image, key);
};
