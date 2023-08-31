import { executeEqualization } from './executeEqualization';
import { executeGammaCorrection } from './executeGammaCorrection';
import { executeBitSlicing } from './executeBitSlicing';
import { generateCanvasData } from 'utils/auxiliar/generateCanvasData';
import { OperationFunction } from 'types/operations/OperationFunction';
import { HighlightOperationKey } from 'types/operationsNames/highlight';

export const executeHighlightOperation: OperationFunction<
  HighlightOperationKey
> = ([image], [{ key, values }]) => {
  const { width, height } = image;
  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(0, 0, width, height);

  if (key === 'BIT_SLICING') {
    return executeBitSlicing(image, imageData, values[0]);
  }

  const {
    canvas,
    context,
    imageData: resultImageData,
  } = generateCanvasData(width, height);

  const resultCanvases = (() => {
    const imagesData = [resultImageData.data, imageData];
    if (key === 'HISTOGRAM_EQUALIZATION') {
      return executeEqualization(canvas, imagesData);
    }

    executeGammaCorrection(imagesData, values[0]);
    return [canvas];
  })();

  context.putImageData(resultImageData, 0, 0);
  return resultCanvases;
};
