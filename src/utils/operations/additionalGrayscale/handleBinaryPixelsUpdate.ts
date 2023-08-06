import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

export const handleBinaryPixelsUpdate = ([
  resultCanvasData,
  imageData,
]: Uint8ClampedArray[]) => {
  for (let ind = 0; ind < imageData.length; ind += 4) {
    const grayValue = getGrayValueFromImagePixel(imageData, ind);
    const binaryValue = grayValue <= 127 ? 0 : 255;

    fillImagePixelWithSameValues(binaryValue, resultCanvasData, ind);
  }
};
