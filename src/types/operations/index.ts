import { ARITHMETICS_OPERATIONS } from './arithmetics';
import { LOGICS_OPERATIONS } from './logics';

export const OPERATIONS = {
  ...ARITHMETICS_OPERATIONS,
  ...LOGICS_OPERATIONS,
} as const;

export type OperationKey = keyof typeof OPERATIONS;
