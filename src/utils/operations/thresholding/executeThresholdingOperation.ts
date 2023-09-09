import { OperationFunction } from 'types/operations/OperationFunction';
import { ThresholdingOperationKey } from 'types/operationsNames/thresholding';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { handleGlobalThresholdPixelsUpdate } from './globalThreshold/handleGlobalThresholdPixelsUpdate';
import { handleLocalThresholdPixelsUpdate } from './localThreshold/handleLocalThresholdPixelsUpdate';

export const executeThresholdingOperation: OperationFunction<
  ThresholdingOperationKey
> = ([image], [operationData]) => {
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);
  const imagesDataArray = [resultImageData.data, imageData.data];

  if (operationData.key === 'GLOBAL') {
    handleGlobalThresholdPixelsUpdate(imagesDataArray);
  } else {
    handleLocalThresholdPixelsUpdate(operationData, image, imagesDataArray);
  }

  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};
