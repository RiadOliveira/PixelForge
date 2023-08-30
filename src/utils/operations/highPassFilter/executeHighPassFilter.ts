import { OperationData } from 'types/operations/OperationData';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { updatePixelsForHightBoost } from './updatePixelsForHightBoost';
import { updatePixelsForOtherFilters } from './updatePixelsForOtherFilters';

export const executeHighPassFilter = (
  [image]: HTMLCanvasElement[],
  [{ key }]: OperationData[],
) => {
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  const updatePixelsFunction =
    key === 'HIGHT_BOOST'
      ? updatePixelsForHightBoost
      : updatePixelsForOtherFilters;

  updatePixelsFunction(key, image, [resultImageData.data, imageData.data]);
  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};
