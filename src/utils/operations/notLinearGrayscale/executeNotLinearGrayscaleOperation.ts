import { OperationData } from 'types/operations/OperationData';
import { NotLinearGrayscaleOperationKey } from 'types/operationsNames/notLinearGrayScale';
import { handleBinaryPixelsUpdate } from './handleBinaryPixelsUpdate';
import { handleReversePixelsUpdate } from './handleReversePixelsUpdate';
import { handleNotLinearWithFunctionPixelsUpdate } from './handleNotLinearWithFunctionPixelsUpdate';

export const executeNotLinearGrayscaleOperation = (
  [image]: HTMLCanvasElement[],
  [{ key }]: OperationData[],
  _normalizeValues: boolean,
) => {
  const { width, height } = image;

  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = width;
  resultCanvas.height = height;

  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(0, 0, width, height);
  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(0, 0, width, height);

  handleUpdatePixels(key as NotLinearGrayscaleOperationKey, [
    resultImageData.data,
    imageData,
  ]);
  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};

const handleUpdatePixels = (
  operationKey: NotLinearGrayscaleOperationKey,
  [resultCanvasData, imageData]: Uint8ClampedArray[],
) => {
  const handlePixelsUpdateFunction = (() => {
    switch (operationKey) {
      case 'BINARY':
        return handleBinaryPixelsUpdate;
      case 'REVERSE':
        return handleReversePixelsUpdate;
      default:
        return handleNotLinearWithFunctionPixelsUpdate;
    }
  })();

  handlePixelsUpdateFunction(operationKey, [resultCanvasData, imageData]);
};
