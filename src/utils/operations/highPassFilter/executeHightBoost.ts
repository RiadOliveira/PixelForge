import { getRGBAColorOfIndex } from 'utils/auxiliar/getRGBAColorOfIndex';
import { executeLowPassFilter } from '../lowPassFilter/executeLowPassFilter';

const LOW_PASS_KERNEL_SIZE = 3;

export const executeHightBoost = (
  image: HTMLCanvasElement,
  amplificationFactor: number,
) => {
  const [resultCanvas] = executeLowPassFilter(
    [image],
    [{ key: 'AVERAGE', values: [LOW_PASS_KERNEL_SIZE] }],
  );
  const resultContext = resultCanvas.getContext('2d')!;
  const resultImageData = resultContext.getImageData(
    0,
    0,
    image.width,
    image.height,
  );

  handlePixelsUpdate(resultImageData.data, amplificationFactor);
  resultContext.putImageData(resultImageData, 0, 0);
  return [resultCanvas];
};

const handlePixelsUpdate = (
  resultImageData: Uint8ClampedArray,
  amplificationFactor: number,
) => {
  const parsedFactor = amplificationFactor - 1;
  const kernelTimes4 = LOW_PASS_KERNEL_SIZE * 4;

  for (let ind = 0; ind < resultImageData.length; ind++) {
    const rgbaColor = getRGBAColorOfIndex(ind);

    if (rgbaColor !== 'ALPHA') {
      resultImageData[ind] =
        (1 + parsedFactor) * resultImageData[ind] -
        resultImageData[ind + kernelTimes4 + 4 + (ind % 4)];
    }
  }
};
