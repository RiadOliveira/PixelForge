import { OperationData } from 'types/operations/OperationData';
import { DecompositionsKey } from 'types/operationsNames/decompositions';
import {
  convertCmykToImageData,
  convertHsbToImageData,
  convertRgbToImageData,
  convertYuvToImageData,
} from 'utils/auxiliar/colorSpaceToImageDataConversions';
import { rgbToCmyk, rgbToHsb, rgbToYuv } from 'utils/auxiliar/rgbConversions';

interface CanvasData {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  imageData: ImageData;
}

const DECOMPOSITION_FUNCTIONS = {
  RGB: {
    extractComponents: (rgb: number[]) => rgb,
    convertColorSpaceToImageData: convertRgbToImageData,
  },
  HSB: {
    extractComponents: rgbToHsb,
    convertColorSpaceToImageData: convertHsbToImageData,
  },
  YUV: {
    extractComponents: rgbToYuv,
    convertColorSpaceToImageData: convertYuvToImageData,
  },
  CMYK: {
    extractComponents: rgbToCmyk,
    convertColorSpaceToImageData: convertCmykToImageData,
  },
};

export const executeDecomposition = (
  [image]: HTMLCanvasElement[],
  [{ key }]: OperationData[],
  _normalizeValues: boolean,
) => {
  const { width, height } = image;
  const resultCanvasQuantity = key.length;
  const resultCanvases = [] as CanvasData[];

  for (let ind = 0; ind < resultCanvasQuantity; ind++) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d')!;
    const data = context.getImageData(0, 0, width, height);

    resultCanvases.push({ canvas, context, imageData: data });
  }

  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(
    0,
    0,
    image.width,
    image.height,
  );

  const { extractComponents, convertColorSpaceToImageData } =
    DECOMPOSITION_FUNCTIONS[key as DecompositionsKey];

  for (let ind = 0; ind < imageData.length; ind += 4) {
    const rgb = [imageData[ind], imageData[ind + 1], imageData[ind + 2]];
    const colorSpaceData = convertColorSpaceToImageData(extractComponents(rgb));

    colorSpaceData.forEach((dataValues, index) => {
      const {
        imageData: { data },
      } = resultCanvases[index];

      for (let i = 0; i < 3; i++) data[ind + i] = dataValues[i];
      data[ind + 3] = 255;
    });
  }

  return resultCanvases.map(({ canvas, context, imageData }) => {
    context.putImageData(imageData, 0, 0);
    return canvas;
  });
};
