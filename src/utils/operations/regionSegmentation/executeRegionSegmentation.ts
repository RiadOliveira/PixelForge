import { OperationFunction } from 'types/operations/OperationFunction';
import { RegionSegmentationKey } from 'types/operationsNames/regionSegmentation';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { getGrayValueFromImagePixel } from 'utils/auxiliar/getGrayValueFromImagePixel';

interface Seed {
  value: number;
  color: number[];
}

export const executeRegionSegmentation: OperationFunction<
  RegionSegmentationKey
> = (
  [image],
  [
    {
      values: [threshold, seedsQuantity],
    },
  ],
) => {
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  const seeds = generateSeeds(imageData.data, seedsQuantity || 1);
  for (let ind = 0; ind < imageData.data.length; ind += 4) {
    const grayValue = getGrayValueFromImagePixel(imageData.data, ind);

    const findedSeed = seeds.find(
      ({ value }) => Math.abs(grayValue - value) <= (threshold || 4),
    );
    const resultRgb = (() => {
      if (findedSeed !== undefined) return findedSeed.color;
      return [...Array(3).keys()].map(rgbInd => imageData.data[ind + rgbInd]);
    })();

    resultRgb.forEach((color, rgbInd) => {
      resultImageData.data[ind + rgbInd] = color;
    });
    resultImageData.data[ind + 3] = 255;
  }

  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};

const generateSeeds = (imageData: Uint8ClampedArray, seedsQuantity: number) => {
  const seeds: Seed[] = [];

  for (let ind = 0; ind < seedsQuantity; ind++) {
    const pixelIndex = Math.floor(Math.random() * imageData.length);
    const parsedIndex = pixelIndex - (pixelIndex % 4);

    const seedValue = getGrayValueFromImagePixel(imageData, parsedIndex);
    const seedColor = generateRandomRGBColor();

    seeds.push({ value: seedValue, color: seedColor });
  }

  return seeds;
};

const generateRandomRGBColor = () => [
  Math.floor(Math.random() * 256),
  Math.floor(Math.random() * 256),
  Math.floor(Math.random() * 256),
];
