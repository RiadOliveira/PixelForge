import { OperationData } from 'types/operations/OperationData';
import { executeEqualization } from './executeEqualization';
import { executeGammaCorrection } from './executeGammaCorrection';

export const executeGammaCorrectionOrEqualization = (
  [image]: HTMLCanvasElement[],
  [{ key, values }]: OperationData[],
  _normalizeValues: boolean,
) => {
  const isEqualization = key === 'EQUALIZATION';
  const { width, height } = image;

  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = width;
  resultCanvas.height = height;

  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(0, 0, width, height);
  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(0, 0, width, height);

  const resultCanvases = (() => {
    const imagesData = [resultImageData.data, imageData];
    if (isEqualization) return executeEqualization(resultCanvas, imagesData);

    executeGammaCorrection(imagesData, values[0]);
    return [resultCanvas];
  })();

  resultContext.putImageData(resultImageData, 0, 0);
  return resultCanvases;
};
