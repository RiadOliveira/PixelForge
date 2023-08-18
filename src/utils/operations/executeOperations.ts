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
import { ADDITIONAL_GRAYSCALE_OPERATIONS } from 'types/operationsNames/additionalGrayscale';
import { executeAdditionalGrayscaleOperation } from './additionalGrayscale/executeAdditionalGrayscaleOperation';
import { GAMMA_AND_EQUALIZATION } from 'types/operationsNames/gammaAndEqualization';
import { executeGammaCorrectionOrEqualization } from './gammaAndEqualization/executeGammaCorrectionOrEqualization';
import { BIT_SLICING } from 'types/operationsNames/bitSlicing';
import { executeBitSlicingOperation } from './bitSlicing/executeBitSlicingOperation';

type OperationFunction = (
  images: HTMLCanvasElement[],
  operationsData: OperationData[],
  normalizeValues: boolean,
) => HTMLCanvasElement[];

interface OperationFunctionMappedByNames {
  operationNames: { [key: string]: string };
  operationFunction: OperationFunction;
}

const OPERATIONS_FUNCTIONS_MAPPED_BY_NAMES: OperationFunctionMappedByNames[] = [
  {
    operationNames: { ...ARITHMETICS_OPERATIONS, ...LOGICS_OPERATIONS },
    operationFunction: executeBytewiseOperation,
  },
  {
    operationNames: TRANSFORMATIONS,
    operationFunction: executeTransformations,
  },
  {
    operationNames: ZOOM_OPERATIONS,
    operationFunction: executeZoomOperation,
  },
  {
    operationNames: DECOMPOSITIONS,
    operationFunction: executeDecomposition,
  },
  {
    operationNames: PSEUDOCOLORIZATION_OPERATIONS,
    operationFunction: executePseudocolorizationOperation,
  },
  {
    operationNames: LINEAR_GRAYSCALE_OPERATIONS,
    operationFunction: executeLinearGrayscaleOperation,
  },
  {
    operationNames: NOT_LINEAR_GRAYSCALE_OPERATIONS,
    operationFunction: executeNotLinearGrayscaleOperation,
  },
  {
    operationNames: ADDITIONAL_GRAYSCALE_OPERATIONS,
    operationFunction: executeAdditionalGrayscaleOperation,
  },
  {
    operationNames: GAMMA_AND_EQUALIZATION,
    operationFunction: executeGammaCorrectionOrEqualization,
  },
  {
    operationNames: BIT_SLICING,
    operationFunction: executeBitSlicingOperation,
  },
];

export const executeOperations = (
  images: HTMLCanvasElement[],
  operationsData: OperationData[],
  normalizeValues = false,
): HTMLCanvasElement[] => {
  const [{ key: operationKey }] = operationsData;

  const { operationFunction } = OPERATIONS_FUNCTIONS_MAPPED_BY_NAMES.find(
    ({ operationNames }) => operationKey in operationNames,
  )!;
  return operationFunction(images, operationsData, normalizeValues);
};
