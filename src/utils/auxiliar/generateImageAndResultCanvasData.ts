import { CanvasData } from 'types/CanvasData';
import { generateResultCanvasData } from './generateResultCanvasData';

interface ImageAndResultCanvasData {
  originalImage: CanvasData;
  resultCanvas: CanvasData;
}

export const generateImageAndResultCanvasData = (
  originalImage: HTMLCanvasElement,
): ImageAndResultCanvasData => {
  const { width, height } = originalImage;

  const originalImageContext = originalImage.getContext('2d')!;
  const originalImageData = originalImageContext.getImageData(
    0,
    0,
    width,
    height,
  );

  return {
    originalImage: {
      canvas: originalImage,
      context: originalImageContext,
      imageData: originalImageData,
    },
    resultCanvas: generateResultCanvasData(width, height),
  };
};
