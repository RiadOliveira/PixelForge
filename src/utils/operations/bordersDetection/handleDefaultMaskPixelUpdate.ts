import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';

export const handleDefaultMaskPixelUpdate = (
  [resultImageData, imageData]: Uint8ClampedArray[],
  { width, height }: HTMLCanvasElement,
  masks: number[][][],
) => {
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const maxIntensity = getMaxIntensity(imageData, masks, width, [x, y]);
      const pixelIndex = (y * width + x) * 4;

      fillImagePixelWithSameValues(
        Math.max(0, 255 - maxIntensity),
        resultImageData,
        pixelIndex,
      );
    }
  }
};

const getMaxIntensity = (
  imageData: Uint8ClampedArray,
  masks: number[][][],
  width: number,
  [x, y]: number[],
) => {
  return masks.reduce((previous, current) => {
    let convolutionResult = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const maskValue = current[i + 1][j + 1];
        const neighborIndex = ((y + i) * width + x + j) * 4;

        convolutionResult += maskValue * imageData[neighborIndex];
      }
    }

    return Math.max(previous, Math.abs(convolutionResult));
  }, 0);
};
