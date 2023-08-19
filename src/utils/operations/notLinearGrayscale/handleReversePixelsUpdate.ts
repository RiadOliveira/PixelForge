import { NotLinearGrayscaleOperationKey } from 'types/operationsNames/notLinearGrayScale';
import { getRGBAColorOfIndex } from 'utils/auxiliar/getRGBAColorOfIndex';

export const handleReversePixelsUpdate = (
  _operationKey: NotLinearGrayscaleOperationKey,
  [resultCanvasData, imageData]: Uint8ClampedArray[],
) => {
  for (let ind = 0; ind < imageData.length; ind++) {
    const isAlpha = getRGBAColorOfIndex(ind) === 'ALPHA';
    resultCanvasData[ind] = isAlpha ? 255 : 255 - imageData[ind];
  }
};
