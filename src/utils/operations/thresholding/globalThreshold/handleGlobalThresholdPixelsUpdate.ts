import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

const THRESHOLD = 127;

export const handleGlobalThresholdPixelsUpdate = ([
  resultImageData,
  imageData,
]: Uint8ClampedArray[]) => {
  for (let ind = 0; ind < imageData.length; ind += 4) {
    const grayValue = getGrayValueFromImagePixel(imageData, ind);

    fillImagePixelWithSameValues(
      grayValue <= THRESHOLD ? 0 : 255,
      resultImageData,
      ind,
    );
  }
};
