import { ARITHMETICS_OPERATIONS } from './arithmetics';
import { DECOMPOSITIONS } from './decompositions';
import { LINEAR_GRAYSCALE_OPERATIONS } from './linearGrayScale';
import { LOGICS_OPERATIONS } from './logics';
import { NOT_LINEAR_GRAYSCALE_OPERATIONS } from './notLinearGrayScale';
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
  ...LINEAR_GRAYSCALE_OPERATIONS,
  ...NOT_LINEAR_GRAYSCALE_OPERATIONS,
} as const;

export type OperationKey = keyof typeof OPERATIONS;
