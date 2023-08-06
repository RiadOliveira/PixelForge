import { ARITHMETICS_OPERATIONS } from './arithmetics';
import { DECOMPOSITIONS } from './decompositions';
import { LOGICS_OPERATIONS } from './logics';
import { PSEUDOCOLORIZATION_OPERATIONS } from './pseudocolorization';
import { TRANSFORMATIONS } from './transformations';
import { ZOOM_OPERATIONS } from './zoom';

export const OPERATIONS = {
  ...ARITHMETICS_OPERATIONS,
  ...LOGICS_OPERATIONS,
  ...TRANSFORMATIONS,
  ...ZOOM_OPERATIONS,
  ...DECOMPOSITIONS,
  ...PSEUDOCOLORIZATION_OPERATIONS,
} as const;

export type OperationKey = keyof typeof OPERATIONS;
