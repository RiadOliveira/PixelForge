import { OperationFunction } from 'types/operations/OperationFunction';
import { HalftoningFiltersKey } from 'types/operationsNames/halftoningFilters';

export const executeHalftoningFilter: OperationFunction<
  HalftoningFiltersKey
> = ([image], [{ key }]) => {
  return [image];
};
