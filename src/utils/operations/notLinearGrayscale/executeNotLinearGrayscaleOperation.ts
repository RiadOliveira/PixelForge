import { OperationData } from 'types/operations/OperationData';
import { NotLinearGrayscaleOperationKey } from 'types/operationsNames/notLinearGrayScale';
import { handleBinaryPixelsUpdate } from './handleBinaryPixelsUpdate';
import { handleReversePixelsUpdate } from './handleReversePixelsUpdate';
import { handleNotLinearWithFunctionPixelsUpdate } from './handleNotLinearWithFunctionPixelsUpdate';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';

export const executeNotLinearGrayscaleOperation = (
  [image]: HTMLCanvasElement[],
  [{ key }]: OperationData[],
) => {
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  handleUpdatePixels(key as NotLinearGrayscaleOperationKey, [
    resultImageData.data,
    imageData.data,
  ]);
  context.putImageData(resultImageData, 0, 0);

  return [canvas];
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
