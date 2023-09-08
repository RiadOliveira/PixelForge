import { LowPassFilterKey } from 'types/operationsNames/lowPassFilters';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { OperationFunction } from 'types/operations/OperationFunction';
import { handleEdgePreservingFilterPixelsUpdate } from './edgePreservingFilters/handleEdgePreservingFilterPixelsUpdate';
import { handleLowPassDefaultFilterPixelsUpdate } from './defaultFilters/handleLowPassDefaultFilterPixelsUpdate';
import { isLowFilterEdgePreservingKey } from 'utils/auxiliar/isLowFilterEdgePreservingKey';

export const executeLowPassFilter: OperationFunction<LowPassFilterKey> = (
  [image],
  [{ key, values }],
) => {
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  const edgePreservingFilter = isLowFilterEdgePreservingKey(key);
  const imagesDataArray = [resultImageData.data, imageData.data];

  if (edgePreservingFilter) {
    handleEdgePreservingFilterPixelsUpdate(key, image, imagesDataArray);
  } else {
    handleLowPassDefaultFilterPixelsUpdate(
      key,
      image,
      imagesDataArray,
      values[0],
    );
  }

  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};
