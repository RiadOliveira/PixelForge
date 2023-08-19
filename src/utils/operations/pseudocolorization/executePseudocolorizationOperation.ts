import { OperationData } from 'types/operations/OperationData';
import { handleDensitySlicingPixelsUpdate } from './handleDensitySlicingPixelsUpdate';
import { handleColorRedistributionPixelsUpdate } from './handleColorRedistributionPixelsUpdate';
import { PseudocolorizationKey } from 'types/operationsNames/pseudocolorization';

const HANDLE_PIXELS_UPDATE = {
  DENSITY_SLICING: handleDensitySlicingPixelsUpdate,
  COLOR_REDISTRIBUTION: handleColorRedistributionPixelsUpdate,
};

export const executePseudocolorizationOperation = (
  [image]: HTMLCanvasElement[],
  [{ key }]: OperationData[],
) => {
  const { width, height } = image;

  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = width;
  resultCanvas.height = height;

  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(0, 0, width, height);
  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(0, 0, width, height);

  const handlePixelsUpdate = HANDLE_PIXELS_UPDATE[key as PseudocolorizationKey];
  handlePixelsUpdate([resultImageData.data, imageData]);

  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};
