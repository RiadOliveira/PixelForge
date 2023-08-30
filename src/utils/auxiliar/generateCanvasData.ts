import { CanvasData } from 'types/CanvasData';

export const generateCanvasData = (
  width: number,
  height: number,
): CanvasData => {
  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = width;
  resultCanvas.height = height;

  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(0, 0, width, height);

  return {
    canvas: resultCanvas,
    context: resultContext,
    imageData: resultImageData,
  };
};
