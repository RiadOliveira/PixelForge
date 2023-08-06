import { OperationData } from 'types/operations/OperationData';
import { ZoomOperationKey } from 'types/operationsNames/zoom';
import { handleReplicationOrExclusionPixelsUpdate } from './handleReplicationOrExclusionPixelsUpdate';
import { handleInterpolationPixelsUpdate } from './handleInterpolationPixelsUpdate';
import { handleAverageValuePixelsUpdate } from './handleAverageValuePixelsUpdate';

const UPDATE_CANVAS_PIXELS_FUNCTIONS = {
  ZOOM_IN_REPLICATION: handleReplicationOrExclusionPixelsUpdate,
  ZOOM_OUT_EXCLUSION: handleReplicationOrExclusionPixelsUpdate,
  ZOOM_IN_INTERPOLATION: handleInterpolationPixelsUpdate,
  ZOOM_OUT_AVERAGE_VALUE: handleAverageValuePixelsUpdate,
};

export const executeZoomOperation = (
  [image]: HTMLCanvasElement[],
  [
    {
      key,
      values: [zoomFactor],
    },
  ]: OperationData[],
  _normalizeValues: boolean,
) => {
  const parsedZoomFactor = parseZoomFactor(key as ZoomOperationKey, zoomFactor);
  const { width: imageWidth, height: imageHeight } = image;

  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = imageWidth * parsedZoomFactor;
  resultCanvas.height = imageHeight * parsedZoomFactor;

  const { width: resultWidth, height: resultHeight } = resultCanvas;
  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(
    0,
    0,
    resultWidth,
    resultHeight,
  );
  const imageContext = image.getContext('2d')!;
  const { data: imageData } = imageContext.getImageData(
    0,
    0,
    imageWidth,
    imageHeight,
  );

  const updatePixelsFunction =
    UPDATE_CANVAS_PIXELS_FUNCTIONS[key as ZoomOperationKey];

  updatePixelsFunction(
    [resultCanvas, image],
    [resultImageData.data, imageData],
    parsedZoomFactor,
  );
  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};

const parseZoomFactor = (
  zoomOperationKey: ZoomOperationKey,
  zoomFactor: number,
) => {
  const absoluteFactor = Math.abs(zoomFactor);
  const isZoomIn = zoomOperationKey.startsWith('ZOOM_IN');

  if (isZoomIn === absoluteFactor > 1) return absoluteFactor;
  return 1 / absoluteFactor;
};
