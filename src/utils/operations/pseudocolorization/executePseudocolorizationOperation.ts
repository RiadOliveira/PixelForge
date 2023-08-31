import { handleDensitySlicingPixelsUpdate } from './handleDensitySlicingPixelsUpdate';
import { handleColorRedistributionPixelsUpdate } from './handleColorRedistributionPixelsUpdate';
import { PseudocolorizationKey } from 'types/operationsNames/pseudocolorization';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { OperationFunction } from 'types/operations/OperationFunction';

const HANDLE_PIXELS_UPDATE = {
  DENSITY_SLICING: handleDensitySlicingPixelsUpdate,
  COLOR_REDISTRIBUTION: handleColorRedistributionPixelsUpdate,
};

export const executePseudocolorizationOperation: OperationFunction<
  PseudocolorizationKey
> = ([image], [{ key }]) => {
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  const handlePixelsUpdate = HANDLE_PIXELS_UPDATE[key];
  handlePixelsUpdate([resultImageData.data, imageData.data]);

  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};
