import { DrawData } from 'types/DrawData';

export const drawImageOnCanvas = (
  image: HTMLImageElement | HTMLCanvasElement,
  canvas: HTMLCanvasElement,
  {
    width = image.width,
    height = image.height,
    startX = 0,
    startY = 0,
  }: Partial<DrawData> = {},
  context: CanvasRenderingContext2D = canvas.getContext('2d')!,
) => {
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, startX, startY, width, height);
};
