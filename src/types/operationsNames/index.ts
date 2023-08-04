import { ARITHMETICS_OPERATIONS } from './arithmetics';
import { LOGICS_OPERATIONS } from './logics';
import { TRANSFORMATIONS } from './transformations';
import { ZOOM_OPERATIONS } from './zoom';

export const OPERATIONS = {
  ...ARITHMETICS_OPERATIONS,
  ...LOGICS_OPERATIONS,
  ...TRANSFORMATIONS,
  ...ZOOM_OPERATIONS,
} as const;

export type OperationKey = keyof typeof OPERATIONS;
