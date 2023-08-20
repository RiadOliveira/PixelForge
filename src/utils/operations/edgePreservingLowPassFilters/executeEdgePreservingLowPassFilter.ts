import { OperationData } from 'types/operations/OperationData';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';

export const executeEdgePreservingLowPassFilter = (
  [image]: HTMLCanvasElement[],
  [{ key }]: OperationData[],
) => {
  const { originalImage, resultCanvas } =
    generateImageAndResultCanvasData(image);

  return [image];
};
