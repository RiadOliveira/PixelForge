import { OperationKey } from 'types/operationsNames';
import { LOGICS_OPERATIONS } from 'types/operationsNames/logics';
import { executeBytewiseOperation } from './bytewise/executeBytewiseOperation';
import { ARITHMETICS_OPERATIONS } from 'types/operationsNames/arithmetics';
import { OperationData } from 'types/operations/OperationData';
import { BytewiseOperationKey } from 'types/operations/BytewiseOperations';

export const executeOperation = (
  images: HTMLCanvasElement[],
  operationsData: OperationData[],
  normalizeValues = false,
): HTMLCanvasElement[] => {
  const [{ key: operationKey, values }] = operationsData;
  const arithmeticOrLogicOperation = isArithmeticOrLogicOperation(operationKey);

  if (arithmeticOrLogicOperation) {
    return executeBytewiseOperation(
      images,
      operationKey as BytewiseOperationKey,
      values,
      normalizeValues,
    );
  }

  return images;
};

const isArithmeticOrLogicOperation = (operationKey: OperationKey) =>
  operationKey in ARITHMETICS_OPERATIONS || operationKey in LOGICS_OPERATIONS;
