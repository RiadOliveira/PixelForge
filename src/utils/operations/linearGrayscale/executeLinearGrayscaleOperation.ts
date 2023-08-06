import { GrayLevels } from 'types/operations/GrayLevels';
import { OperationData } from 'types/operations/OperationData';
import { getGrayLevelsOfImage } from 'utils/auxiliar/getGrayLevelsOfImage';
import { handleNewIntervalPixelsUpdate } from './handleNewIntervalPixelsUpdate';
import { handleByPartsPixelsUpdate } from './handleByPartsPixelsUpdate';

export const executeLinearGrayscaleOperation = (
  [image]: HTMLCanvasElement[],
  operationsData: OperationData[],
  _normalizeValues: boolean,
) => {
  const [{ key: operationKey }] = operationsData;
  const { width, height } = image;

  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = width;
  resultCanvas.height = height;

  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(0, 0, width, height);
  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(0, 0, width, height);

  const imageGrayLevels = getGrayLevelsOfImage(imageData);
  const factorsA = operationsData.map(({ values }) =>
    getFactorA(imageGrayLevels, values),
  );
  const intervals = extractIntervalsFromOperationsData(operationsData);
  const handlePixelsUpdate =
    operationKey === 'NEW_INTERVAL'
      ? handleNewIntervalPixelsUpdate
      : handleByPartsPixelsUpdate;

  handlePixelsUpdate(
    [resultImageData.data, imageData],
    intervals,
    imageGrayLevels,
    factorsA,
  );
  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};

const getFactorA = (
  { min: imageMin, max: imageMax }: GrayLevels,
  [min, max]: number[],
) => (max - min) / (imageMax - imageMin);

const extractIntervalsFromOperationsData = (operationsData: OperationData[]) =>
  operationsData.map(({ values: [start, end] }) => [start, end]);
