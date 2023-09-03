import { OperationFunction } from 'types/operations/OperationFunction';
import { BordersDetectionKey } from 'types/operationsNames/bordersDetection';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { handleMagnitudeMaskPixelUpdate } from './handleMagnitudeMaskPixelUpdate';
import { handleDefaultMaskPixelUpdate } from './handleDefaultMaskPixelUpdate';

const SQRT_OF_2 = Math.sqrt(2);

const DETECTION_MASKS: { [key in BordersDetectionKey]: number[][][] } = {
  ROBERTS: [
    [
      [1, 0, 0],
      [0, -1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [-1, 0, 0],
      [0, 0, 0],
    ],
  ],
  ROBERTS_CROSSED: [
    [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 0, 0],
    ],
    [
      [1, -1, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  ],
  PREWIIT_GX: [
    [
      [-1, 0, 1],
      [-1, 0, 1],
      [-1, 0, 1],
    ],
  ],
  PREWIIT_GY: [
    [
      [-1, -1, -1],
      [0, 0, 0],
      [1, 1, 1],
    ],
  ],
  PREWIIT_MAGNITUDE: [
    [
      [-1, 0, 1],
      [-1, 0, 1],
      [-1, 0, 1],
    ],
    [
      [-1, -1, -1],
      [0, 0, 0],
      [1, 1, 1],
    ],
  ],
  SOBEL_GX: [
    [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
  ],
  SOBEL_GY: [
    [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ],
  ],
  SOBEL_MAGNITUDE: [
    [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
    [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ],
  ],
  KRISH: [
    [
      [5, -3, -3],
      [5, 0, -3],
      [5, -3, -3],
    ],
    [
      [-3, -3, -3],
      [5, 0, -3],
      [5, 5, -3],
    ],
    [
      [-3, -3, -3],
      [-3, 0, -3],
      [5, 5, 5],
    ],
    [
      [-3, -3, -3],
      [-3, 0, 5],
      [-3, 5, 5],
    ],
    [
      [-3, -3, 5],
      [-3, 0, 5],
      [-3, -3, 5],
    ],
    [
      [-3, 5, 5],
      [-3, 0, 5],
      [-3, -3, -3],
    ],
    [
      [5, 5, 5],
      [-3, 0, -3],
      [-3, -3, -3],
    ],
    [
      [5, 5, -3],
      [5, 0, -3],
      [-3, -3, -3],
    ],
  ],
  ROBISON: [
    [
      [1, 0, -1],
      [2, 0, -2],
      [1, 0, -1],
    ],
    [
      [0, -1, -2],
      [1, 0, -1],
      [2, 1, 0],
    ],
    [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ],
    [
      [-2, -1, 0],
      [-1, 0, 1],
      [0, 1, 2],
    ],
    [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
    [
      [0, 1, 2],
      [-1, 0, 1],
      [-2, -1, 0],
    ],
    [
      [1, 2, 1],
      [0, 0, 0],
      [-1, -2, -1],
    ],
    [
      [2, 1, 0],
      [1, 0, -1],
      [0, -1, -2],
    ],
  ],
  FREY_CHEN: [
    [
      [1, SQRT_OF_2, 1],
      [0, 0, 0],
      [-1, -SQRT_OF_2, -1],
    ],
    [
      [1, 0, -1],
      [SQRT_OF_2, 0, -SQRT_OF_2],
      [1, 0, -1],
    ],
    [
      [0, -1, SQRT_OF_2],
      [1, 0, -1],
      [-SQRT_OF_2, 1, 0],
    ],
    [
      [SQRT_OF_2, -1, 0],
      [-1, 0, 1],
      [0, 1, -SQRT_OF_2],
    ],
    [
      [0, 1, 0],
      [-1, 0, -1],
      [0, 1, 0],
    ],
    [
      [-1, 0, 1],
      [0, 0, 0],
      [1, 0, -1],
    ],
    [
      [1, -2, 1],
      [-2, 4, -2],
      [1, -2, 1],
    ],
    [
      [-2, 1, -2],
      [1, 4, 1],
      [-2, 1, -2],
    ],
    [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
  ],
  LAPLACIANO_H1: [
    [
      [0, -1, 0],
      [-1, 4, -1],
      [0, -1, 0],
    ],
  ],
  LAPLACIANO_H2: [
    [
      [-1, -4, -1],
      [-4, 20, -4],
      [-1, -4, -1],
    ],
  ],
};

export const executeBordersDetection: OperationFunction<BordersDetectionKey> = (
  [image],
  [{ key }],
) => {
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  const updatePixelsFunction =
    key === 'SOBEL_MAGNITUDE' || key === 'PREWIIT_MAGNITUDE'
      ? handleMagnitudeMaskPixelUpdate
      : handleDefaultMaskPixelUpdate;

  const masks = DETECTION_MASKS[key];
  updatePixelsFunction([resultImageData.data, imageData.data], image, masks);

  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};
