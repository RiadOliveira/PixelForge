import { OperationKey } from 'types/operationsNames';
import { generateCanvasData } from 'utils/auxiliar/generateCanvasData';

const SCALE_FACTOR = 1.5;
const BLUR_FACTOR = -0.5;

export const updatePixelsForHightBoost = (
  _key: OperationKey,
  { width, height }: HTMLCanvasElement,
  [resultCanvasData, imageData]: Uint8ClampedArray[],
) => {
  const { canvas: blurredCanvas, imageData: blurredImageData } =
    generateCanvasData(width, height);
};
