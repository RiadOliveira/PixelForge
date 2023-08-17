import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';
import { generateHistogramOfImage } from 'utils/auxiliar/generateHistogramOfImage';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

export const executeEqualization = (
  resultCanvas: HTMLCanvasElement,
  [resultImageData, imageData]: Uint8ClampedArray[],
) => {
  const { width, height } = resultCanvas;

  const pixelCount = width * height;
  const histogramData = new Array(256).fill(0);

  for (let ind = 0; ind < pixelCount * 4; ind += 4) {
    const intensity = getGrayValueFromImagePixel(imageData, ind);
    histogramData[intensity]++;
  }

  let sum = 0;
  const normalizedHistogram = histogramData.map(count => {
    sum += count;
    return sum / pixelCount;
  });

  for (let ind = 0; ind < pixelCount * 4; ind += 4) {
    const intensity = getGrayValueFromImagePixel(imageData, ind);

    const newIntensity = Math.round(normalizedHistogram[intensity] * 255);
    fillImagePixelWithSameValues(newIntensity, resultImageData, ind);
  }

  const originalHistogram = generateHistogramOfImage(imageData);
  const resultHistogram = generateHistogramOfImage(resultImageData);

  return [originalHistogram, resultCanvas, resultHistogram];
};
