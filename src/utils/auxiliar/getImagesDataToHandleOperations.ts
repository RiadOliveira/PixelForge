import { ImageDataToHandleOperations } from 'types/operations/ImageDataToHandleOperations';

export const getImagesDataToHandleOperations = (
  images: HTMLCanvasElement[],
  { width: totalWidth, height: totalHeight }: HTMLCanvasElement,
): ImageDataToHandleOperations[] =>
  images.map(image => {
    const { width, height } = image;

    const startX = Math.round((totalWidth - width) / 2);
    const endX = startX + width;
    const startY = Math.round((totalHeight - height) / 2);
    const endY = startY + height;

    const context = image.getContext('2d')!;
    const { data } = context.getImageData(0, 0, width, height);

    return {
      data,
      extremityPoints: {
        startX,
        startY,
        endX,
        endY,
      },
    };
  });
