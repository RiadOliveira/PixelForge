import { OperationKey } from 'types/operationsNames';
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

export const executeOperation = (
  images: HTMLCanvasElement[],
  operationsData: OperationData[],
  normalizeValues = false,
): HTMLCanvasElement[] => {
  const [{ key: operationKey }] = operationsData;
  const operationFunction = getOperationFunction(operationKey);

  return operationFunction(images, operationsData, normalizeValues);
};

const getOperationFunction = (operationKey: OperationKey) => {
  switch (true) {
    case isArithmeticOrLogicOperation(operationKey):
      return executeBytewiseOperation;
    case isTransformation(operationKey):
      return executeTransformations;
    case isZoomOperation(operationKey):
      return executeZoomOperation;
    case isDecomposition(operationKey):
      return executeDecomposition;
    default:
      return executeBytewiseOperation;
  }
};

const isArithmeticOrLogicOperation = (operationKey: OperationKey) =>
  operationKey in ARITHMETICS_OPERATIONS || operationKey in LOGICS_OPERATIONS;

const isTransformation = (operationKey: OperationKey) =>
  operationKey in TRANSFORMATIONS;

const isZoomOperation = (operationKey: OperationKey) =>
  operationKey in ZOOM_OPERATIONS;

const isDecomposition = (operationKey: OperationKey) =>
  operationKey in DECOMPOSITIONS;
