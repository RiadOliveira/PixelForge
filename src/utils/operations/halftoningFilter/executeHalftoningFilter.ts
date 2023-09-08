import { OperationFunction } from 'types/operations/OperationFunction';
import { HalftoningFilterKey } from 'types/operationsNames/halftoningFilters';
import { handleDottedOrderedPixelsUpdate } from './handleDottedOrderedPixelsUpdate';
import { handleErrorDiffusionPixelsUpdate } from './handleErrorDiffusionPixelsUpdate';
import { drawImageOnCanvas } from 'utils/auxiliar/drawImageOnCanvas';

const PATTERNS: { [key in HalftoningFilterKey]: number[][] } = {
  DOTTED_ORDERED_2x2: [
    [0, 2],
    [3, 1],
  ],
  DOTTED_ORDERED_2x3: [
    [3, 0, 4],
    [5, 2, 1],
  ],
  DOTTED_ORDERED_3x3: [
    [6, 8, 4],
    [1, 0, 3],
    [5, 2, 7],
  ],
  ROGERS: [
    [0, 3],
    [3, 2],
  ].map(line => line.map(value => value / 8)),
  FLOYD_STEINBERG: [
    [0, 0, 7],
    [3, 5, 1],
  ].map(line => line.map(value => value / 16)),
  JARVIS_JUDICE_NINKE: [
    [0, 0, 0, 7, 5],
    [3, 5, 7, 5, 3],
    [1, 3, 5, 3, 1],
  ].map(line => line.map(value => value / 48)),
  STUCKI: [
    [0, 0, 0, 8, 4],
    [2, 4, 8, 4, 2],
    [1, 2, 4, 2, 1],
  ].map(line => line.map(value => value / 42)),
  STEVENSONE_ARCE: [
    [0, 0, 0, 0, 0, 32, 0],
    [12, 0, 26, 0, 30, 0, 16],
    [0, 12, 0, 26, 0, 12, 0],
    [5, 0, 12, 0, 12, 0, 5],
  ].map(line => line.map(value => value / 200)),
};

export const executeHalftoningFilter: OperationFunction<HalftoningFilterKey> = (
  [image],
  [{ key }],
) => {
  const { width, height } = image;
  const isDottedOrdered = key.startsWith('DOTTED_ORDERED');

  const canvas = document.createElement('canvas');
  if (isDottedOrdered) drawImageOnCanvas(image, canvas);
  else {
    canvas.width = width;
    canvas.height = height;
  }

  const context = canvas.getContext('2d')!;
  const imageData = context.getImageData(0, 0, width, height);

  const pattern = PATTERNS[key];
  const pixelsUpdateFunction = isDottedOrdered
    ? handleDottedOrderedPixelsUpdate
    : handleErrorDiffusionPixelsUpdate;

  pixelsUpdateFunction(image, imageData.data, pattern);
  context.putImageData(imageData, 0, 0);

  return [canvas];
};
