import { GrayLevels } from 'types/operations/GrayLevels';
import { OperationData } from 'types/operations/OperationData';
import { getGrayLevelsOfImage } from 'utils/auxiliar/getGrayLevelsOfImage';
import { handleNewIntervalPixelsUpdate } from './handleNewIntervalPixelsUpdate';
import { handleByPartsPixelsUpdate } from './handleByPartsPixelsUpdate';
import { LinearGrayscaleOperationKey } from 'types/operationsNames/linearGrayScale';
import { generateImageAndResultCanvasData } from 'utils/auxiliar/generateImageAndResultCanvasData';
import { OperationFunction } from 'types/operations/OperationFunction';

const HANDLE_PIXELS_UPDATE = {
  NEW_INTERVAL: handleNewIntervalPixelsUpdate,
  BY_PARTS: handleByPartsPixelsUpdate,
};

export const executeLinearGrayscaleOperation: OperationFunction<
  LinearGrayscaleOperationKey
> = ([image], operationsData) => {
  const [{ key }] = operationsData;
  const {
    originalImage: { imageData },
    resultCanvas: { canvas, context, imageData: resultImageData },
  } = generateImageAndResultCanvasData(image);

  const imageGrayLevels = getGrayLevelsOfImage(imageData.data);
  const factorsA = operationsData.map(({ values }) =>
    getFactorA(imageGrayLevels, values),
  );
  const intervals = extractIntervalsFromOperationsData(operationsData);
  const handlePixelsUpdate = HANDLE_PIXELS_UPDATE[key];

  handlePixelsUpdate(
    [resultImageData.data, imageData.data],
    intervals,
    imageGrayLevels,
    factorsA,
  );
  context.putImageData(resultImageData, 0, 0);
  return [canvas];
};

const getFactorA = (
  { min: imageMin, max: imageMax }: GrayLevels,
  [min, max]: number[],
) => (max - min) / (imageMax - imageMin);

const extractIntervalsFromOperationsData = (operationsData: OperationData[]) =>
  operationsData.map(({ values: [start, end] }) => [start, end]);
