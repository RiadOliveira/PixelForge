import { OperationKey } from 'types/operations';
import { ARITHMETICS_OPERATIONS } from 'types/operations/arithmetics';
import { LOGICS_OPERATIONS } from 'types/operations/logics';
import { executeBytewiseOperation } from './executeBytewiseOperation';

export const executeOperation = (
  images: HTMLCanvasElement[],
  operationKey: OperationKey,
  inputValues: number[],
): HTMLCanvasElement[] => {
  const arithmeticOrLogicOperation = isArithmeticOrLogicOperation(operationKey);

  if (arithmeticOrLogicOperation) {
    return executeBytewiseOperation(images, operationKey, inputValues);
  }

  return images;
};

const isArithmeticOrLogicOperation = (operationKey: OperationKey) =>
  operationKey in ARITHMETICS_OPERATIONS || operationKey in LOGICS_OPERATIONS;
