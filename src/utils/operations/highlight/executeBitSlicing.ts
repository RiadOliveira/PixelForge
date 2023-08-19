import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';

export const executeBitSlicing = (
  { width, height }: HTMLCanvasElement,
  imageData: Uint8ClampedArray,
  bitsQuantity: number,
) => {
  const resultCanvases = [] as HTMLCanvasElement[];

  for (let bit = 0; bit < bitsQuantity; bit++) {
    const bitPlaneCanvas = document.createElement('canvas');
    bitPlaneCanvas.width = width;
    bitPlaneCanvas.height = height;

    const bitPlaneContext = bitPlaneCanvas.getContext('2d')!;
    const bitPlaneData = bitPlaneContext.getImageData(0, 0, width, height);

    for (let ind = 0; ind < imageData.length; ind += 4) {
      const pixelValue = imageData[ind];
      const bitValue = (pixelValue >> bit) & 1;

      fillImagePixelWithSameValues(bitValue * 255, bitPlaneData.data, ind);
    }

    bitPlaneContext.putImageData(bitPlaneData, 0, 0);
    resultCanvases.push(bitPlaneCanvas);
  }

  return resultCanvases;
};
