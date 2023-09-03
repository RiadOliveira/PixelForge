import { fillImagePixelWithSameValues } from 'utils/auxiliar/fillImagePixelWithSameValues';

export const handleMagnitudeMaskPixelUpdate = (
  [resultImageData, imageData]: Uint8ClampedArray[],
  { width, height }: HTMLCanvasElement,
  masks: number[][][],
) => {
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const intensities = getIntensities(imageData, masks, width, [x, y]);
      const pixelIndex = (y * width + x) * 4;

      const initialGradientMagnitude = intensities.reduce(
        (previous, current) => previous + Math.pow(current, 2),
        0,
      );
      const gradientMagnitude = Math.sqrt(initialGradientMagnitude);

      fillImagePixelWithSameValues(
        Math.max(0, 255 - gradientMagnitude),
        resultImageData,
        pixelIndex,
      );
    }
  }
};

const getIntensities = (
  imageData: Uint8ClampedArray,
  masks: number[][][],
  width: number,
  [x, y]: number[],
) => {
  const intensities = [0, 0];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const neighborIndex = ((y + i) * width + x + j) * 4;

      intensities.forEach((intensity, ind) => {
        const maskValue = masks[ind][i + 1][j + 1];
        intensities[ind] = intensity + maskValue * imageData[neighborIndex];
      });
    }
  }

  return intensities;
};
