import { RGBValuesData } from 'types/RGBValuesData';
import { BytewiseOperation } from 'types/operations/BytewiseOperations';
import { generateDefaultRGBValuesData } from 'utils/auxiliar/generateDefaultRGBValuesData';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { getRGBAColorOfIndex } from 'utils/auxiliar/getRGBAColorOfIndex';
import { transferValuesToNormalizedDataArray } from 'utils/auxiliar/transferValuesToNormalizedDataArray';
import { updateRGBValuesData } from 'utils/auxiliar/updateRGBValuesData';

export const handleBytewiseOneImageOperation = (
  image: HTMLCanvasElement,
  inputValue: number,
  bytewiseOperation: BytewiseOperation,
  normalizeValues: boolean,
) => {
  const {
    originalImage: { imageData },
    resultCanvas: {
      canvas: resultCanvas,
      context: resultContext,
      imageData: resultImageData,
    },
  } = generateImageAndResultCanvasData(image);

  handleUpdateCanvas(
    [resultImageData.data, imageData.data],
    inputValue,
    bytewiseOperation,
    normalizeValues,
  );
  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};

const handleUpdateCanvas = (
  [resultCanvasData, imageData]: Uint8ClampedArray[],
  inputValue: number,
  bytewiseOperation: BytewiseOperation,
  normalizeValues: boolean,
) => {
  const { length } = resultCanvasData;

  const dataArray = normalizeValues ? new Int16Array(length) : resultCanvasData;
  const rgbValuesData = normalizeValues
    ? generateDefaultRGBValuesData()
    : undefined;

  updateCanvasPixelsUsingImageAndInput(
    [dataArray, imageData],
    rgbValuesData,
    inputValue,
    bytewiseOperation,
  );

  if (normalizeValues) {
    transferValuesToNormalizedDataArray(
      dataArray as Int16Array,
      resultCanvasData,
      rgbValuesData!,
    );
  }
};

const updateCanvasPixelsUsingImageAndInput = (
  [resultCanvasData, imageData]: (Uint8ClampedArray | Int16Array)[],
  rgbValuesData: RGBValuesData | undefined,
  inputValue: number,
  bytewiseOperation: BytewiseOperation,
) => {
  for (let ind = 0; ind < resultCanvasData.length; ind++) {
    const rgbaColor = getRGBAColorOfIndex(ind);

    if (rgbaColor === 'ALPHA') resultCanvasData[ind] = 255;
    else {
      resultCanvasData[ind] = bytewiseOperation(imageData[ind], inputValue);
      updateRGBValuesData(rgbValuesData, rgbaColor, resultCanvasData[ind]);
    }
  }
};
