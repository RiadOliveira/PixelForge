import { OperationData } from 'types/operations/OperationData';
import { handleBinaryPixelsUpdate } from './handleBinaryPixelsUpdate';
import { AdditionalGrayscaleOperationKey } from 'types/operationsNames/additionalGrayscale';
import { handleReversePixelsUpdate } from './handleReversePixelsUpdate';

const HANDLE_PIXELS_UPDATE = {
  BINARY: handleBinaryPixelsUpdate,
  REVERSE: handleReversePixelsUpdate,
};

export const executeAdditionalGrayscaleOperation = (
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

  const handlePixelsUpdate =
    HANDLE_PIXELS_UPDATE[key as AdditionalGrayscaleOperationKey];
  handlePixelsUpdate([resultImageData.data, imageData]);

  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};
