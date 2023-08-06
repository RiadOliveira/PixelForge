import { OperationData } from 'types/operations/OperationData';
import { handleDensitySlicingPixelsUpdate } from './handleDensitySlicingPixelsUpdate';
import { handleColorRedistributionPixelsUpdate } from './handleColorRedistributionPixelsUpdate';
import { PseudocolorizationKey } from 'types/operationsNames/pseudocolorization';

const UPDATE_CANVAS_PIXELS_FUNCTIONS = {
  DENSITY_SLICING: handleDensitySlicingPixelsUpdate,
  COLOR_REDISTRIBUTION: handleColorRedistributionPixelsUpdate,
};

export const executePseudocolorizationOperation = (
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
  const { data: resultData } = resultImageData;

  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(0, 0, width, height);

  const handlePixelsUpdate =
    UPDATE_CANVAS_PIXELS_FUNCTIONS[key as PseudocolorizationKey];
  handlePixelsUpdate([resultData, imageData]);

  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};
