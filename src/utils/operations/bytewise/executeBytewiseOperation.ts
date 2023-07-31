import {
  BYTEWISE_OPERATIONS,
  BytewiseOperationKey,
} from 'types/operations/BytewiseOperations';
import { handleBytewiseOneImageOperation } from './handleBytewiseOneImageOperation';
import { handleBytewiseTwoImagesOperation } from './handleBytewiseTwoImagesOperation';
import { OperationData } from 'types/operations/OperationData';

export const executeBytewiseOperation = (
  images: HTMLCanvasElement[],
  [{ key, values }]: OperationData[],
  normalizeValues = false,
) => {
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
