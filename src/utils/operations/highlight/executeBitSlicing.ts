import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { generateResultCanvasData } from 'utils/auxiliar/generateResultCanvasData';

export const executeBitSlicing = (
  { width, height }: HTMLCanvasElement,
  imageData: Uint8ClampedArray,
  bitsQuantity: number,
) => {
  const resultCanvases = [] as HTMLCanvasElement[];

  for (let bit = 0; bit < bitsQuantity; bit++) {
    const {
      canvas,
      context,
      imageData: resultImageData,
    } = generateResultCanvasData(width, height);

    for (let ind = 0; ind < imageData.length; ind += 4) {
      const pixelValue = imageData[ind];
      const bitValue = (pixelValue >> bit) & 1;

      fillImagePixelWithSameValues(bitValue * 255, resultImageData.data, ind);
    }

    context.putImageData(resultImageData, 0, 0);
    resultCanvases.push(canvas);
  }

  return resultCanvases;
};
