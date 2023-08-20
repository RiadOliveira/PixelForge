import { OperationData } from 'types/operations/OperationData';
import { handleDensitySlicingPixelsUpdate } from './handleDensitySlicingPixelsUpdate';
import { handleColorRedistributionPixelsUpdate } from './handleColorRedistributionPixelsUpdate';
import { PseudocolorizationKey } from 'types/operationsNames/pseudocolorization';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';

const HANDLE_PIXELS_UPDATE = {
  DENSITY_SLICING: handleDensitySlicingPixelsUpdate,
  COLOR_REDISTRIBUTION: handleColorRedistributionPixelsUpdate,
};

export const executePseudocolorizationOperation = (
  [image]: HTMLCanvasElement[],
  [{ key }]: OperationData[],
) => {
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  const handlePixelsUpdate = HANDLE_PIXELS_UPDATE[key as PseudocolorizationKey];
  handlePixelsUpdate([resultImageData.data, imageData.data]);

  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};
