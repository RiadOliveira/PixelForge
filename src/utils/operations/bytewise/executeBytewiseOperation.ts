import {
  BYTEWISE_OPERATIONS,
  BytewiseOperationKey,
} from 'types/operations/BytewiseOperations';
import { handleBytewiseOneImageOperation } from './handleBytewiseOneImageOperation';
import { handleBytewiseTwoImagesOperation } from './handleBytewiseTwoImagesOperation';

export const executeBytewiseOperation = (
  images: HTMLCanvasElement[],
  operationKey: BytewiseOperationKey,
  inputValues: number[],
  normalizeValues: boolean,
) => {
  const bytewiseOperation = BYTEWISE_OPERATIONS[operationKey];

  if (images.length === 1) {
    return handleBytewiseOneImageOperation(
      images[0],
      inputValues[0],
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
