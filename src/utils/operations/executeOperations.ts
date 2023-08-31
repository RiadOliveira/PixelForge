import { LOGICS_OPERATIONS } from 'types/operationsNames/logics';
import { executeBytewiseOperation } from './bytewise/executeBytewiseOperation';
import { ARITHMETICS_OPERATIONS } from 'types/operationsNames/arithmetics';
import { OperationData } from 'types/operations/OperationData';
import { TRANSFORMATIONS } from 'types/operationsNames/transformations';
import { executeTransformations } from './transformations/executeTransformations';
import { ZOOM_OPERATIONS } from 'types/operationsNames/zoom';
import { executeZoomOperation } from './zoom/executeZoomOperation';
import { DECOMPOSITIONS } from 'types/operationsNames/decompositions';
import { executeDecomposition } from './decomposition/executeDecomposition';
import { PSEUDOCOLORIZATION_OPERATIONS } from 'types/operationsNames/pseudocolorization';
import { executePseudocolorizationOperation } from './pseudocolorization/executePseudocolorizationOperation';
import { LINEAR_GRAYSCALE_OPERATIONS } from 'types/operationsNames/linearGrayScale';
import { NOT_LINEAR_GRAYSCALE_OPERATIONS } from 'types/operationsNames/notLinearGrayScale';
import { executeLinearGrayscaleOperation } from './linearGrayscale/executeLinearGrayscaleOperation';
import { executeNotLinearGrayscaleOperation } from './notLinearGrayscale/executeNotLinearGrayscaleOperation';
import { HIGHLIGHTS } from 'types/operationsNames/highlight';
import { executeHighlightOperation } from './highlight/executeHighlightOperation';
import { LOW_PASS_FILTERS } from 'types/operationsNames/lowPassFilters';
import { executeLowPassFilter } from './lowPassFilter/executeLowPassFilter';
import { HIGH_PASS_FILTERS } from 'types/operationsNames/highPassFilters';
import { executeHighPassFilter } from './highPassFilter/executeHighPassFilter';
import { HALFTONING_FILTERS } from 'types/operationsNames/halftoningFilters';
import { executeHalftoningFilter } from './halftoningFilter/executeHalftoningFilter';
import { OperationKey } from 'types/operationsNames';
import { OperationFunction } from 'types/operations/OperationFunction';

interface OperationFunctionMappedByKeys {
  operationKeys: OperationKey[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  operationFunction: OperationFunction<any>;
}

const extractOperationKeys = <T extends OperationKey>(operationNamesObject: {
  [key in T]: string;
}) => Object.keys(operationNamesObject) as T[];

const OPERATIONS_FUNCTIONS_MAPPED_BY_NAMES: OperationFunctionMappedByKeys[] = [
  {
    operationKeys: [
      ...extractOperationKeys(ARITHMETICS_OPERATIONS),
      ...extractOperationKeys(LOGICS_OPERATIONS),
    ],
    operationFunction: executeBytewiseOperation,
  },
  {
    operationKeys: extractOperationKeys(TRANSFORMATIONS),
    operationFunction: executeTransformations,
  },
  {
    operationKeys: extractOperationKeys(ZOOM_OPERATIONS),
    operationFunction: executeZoomOperation,
  },
  {
    operationKeys: extractOperationKeys(DECOMPOSITIONS),
    operationFunction: executeDecomposition,
  },
  {
    operationKeys: extractOperationKeys(PSEUDOCOLORIZATION_OPERATIONS),
    operationFunction: executePseudocolorizationOperation,
  },
  {
    operationKeys: extractOperationKeys(LINEAR_GRAYSCALE_OPERATIONS),
    operationFunction: executeLinearGrayscaleOperation,
  },
  {
    operationKeys: extractOperationKeys(NOT_LINEAR_GRAYSCALE_OPERATIONS),
    operationFunction: executeNotLinearGrayscaleOperation,
  },
  {
    operationKeys: extractOperationKeys(HIGHLIGHTS),
    operationFunction: executeHighlightOperation,
  },
  {
    operationKeys: extractOperationKeys(LOW_PASS_FILTERS),
    operationFunction: executeLowPassFilter,
  },
  {
    operationKeys: extractOperationKeys(HIGH_PASS_FILTERS),
    operationFunction: executeHighPassFilter,
  },
  {
    operationKeys: extractOperationKeys(HALFTONING_FILTERS),
    operationFunction: executeHalftoningFilter,
  },
];

export const executeOperations = (
  images: HTMLCanvasElement[],
  operationsData: OperationData[],
  normalizeValues = false,
): HTMLCanvasElement[] => {
  const [{ key }] = operationsData;

  const { operationFunction } = OPERATIONS_FUNCTIONS_MAPPED_BY_NAMES.find(
    ({ operationKeys }) => operationKeys.includes(key),
  )!;
  return operationFunction(images, operationsData, normalizeValues);
};
