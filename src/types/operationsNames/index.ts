import { ARITHMETICS_OPERATIONS } from './arithmetics';
import { DECOMPOSITIONS } from './decompositions';
import { EDGE_PRESERVING_LOW_PASS_FILTERS } from './edgePreservingLowPassFilters';
import { HIGHLIGHTS } from './highlight';
import { LINEAR_GRAYSCALE_OPERATIONS } from './linearGrayScale';
import { LOGICS_OPERATIONS } from './logics';
import { LOW_PASS_FILTERS } from './lowPassFilters';
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
  ...HIGHLIGHTS,
  ...LOW_PASS_FILTERS,
  ...EDGE_PRESERVING_LOW_PASS_FILTERS,
} as const;

export type OperationKey = keyof typeof OPERATIONS;
