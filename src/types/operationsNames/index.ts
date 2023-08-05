import { ARITHMETICS_OPERATIONS } from './arithmetics';
import { DECOMPOSITIONS } from './decompositions';
import { LOGICS_OPERATIONS } from './logics';
import { TRANSFORMATIONS } from './transformations';
import { ZOOM_OPERATIONS } from './zoom';

export const OPERATIONS = {
  ...ARITHMETICS_OPERATIONS,
  ...LOGICS_OPERATIONS,
  ...TRANSFORMATIONS,
  ...ZOOM_OPERATIONS,
  ...DECOMPOSITIONS,
} as const;

export type OperationKey = keyof typeof OPERATIONS;
