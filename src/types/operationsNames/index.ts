import { ARITHMETICS_OPERATIONS } from './arithmetics';
import { LOGICS_OPERATIONS } from './logics';
import { TRANSFORMATIONS } from './transformations';

export const OPERATIONS = {
  ...ARITHMETICS_OPERATIONS,
  ...LOGICS_OPERATIONS,
  ...TRANSFORMATIONS,
} as const;

export type OperationKey = keyof typeof OPERATIONS;
