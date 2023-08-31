import {
  BYTEWISE_OPERATIONS,
  BytewiseOperationKey,
} from 'types/operations/BytewiseOperations';
import { handleBytewiseOneImageOperation } from './handleBytewiseOneImageOperation';
import { handleBytewiseTwoImagesOperation } from './handleBytewiseTwoImagesOperation';
import { OperationFunction } from 'types/operations/OperationFunction';
import { ArithmeticOperationKey } from 'types/operationsNames/arithmetics';
import { LogicOperationKey } from 'types/operationsNames/logics';

export const executeBytewiseOperation: OperationFunction<
  ArithmeticOperationKey | LogicOperationKey
> = (images, [{ key, values }], normalizeValues = false) => {
  const bytewiseOperation = BYTEWISE_OPERATIONS[key as BytewiseOperationKey];

  if (images.length === 1) {
    return handleBytewiseOneImageOperation(
      images[0],
      values[0],
      bytewiseOperation,
      normalizeValues,
    );
  }

  return handleBytewiseTwoImagesOperation(
    images,
    bytewiseOperation,
    normalizeValues,
  );
};
