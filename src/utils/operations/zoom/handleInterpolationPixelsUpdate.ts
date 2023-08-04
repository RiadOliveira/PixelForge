interface DataToCalculateValues {
  modifiers: number[];
  indexes: number[];
}

export const handleInterpolationPixelsUpdate = (
  [{ width: resultWidth, height: resultHeight }, image]: HTMLCanvasElement[],
  [resultData, imageData]: Uint8ClampedArray[],
  zoomFactor: number,
) => {
  for (let x = 0; x < resultWidth; x++) {
    for (let y = 0; y < resultHeight; y++) {
      const originalX = x / zoomFactor;
      const originalY = y / zoomFactor;

      const dataToCalculateValues = getDataToCalculateResultValues(
        [originalX, originalY],
        image,
      );

      const resultIndex = (y * resultWidth + x) * 4;
      for (let ind = 0; ind < 4; ind++) {
        resultData[resultIndex + ind] = getIterationResultValue(
          ind,
          imageData,
          dataToCalculateValues,
        );
      }
    }
  }
};

const getDataToCalculateResultValues = (
  [originalX, originalY]: number[],
  { width: imageWidth, height: imageHeight }: HTMLCanvasElement,
) => {
  const x1 = Math.floor(originalX);
  const x2 = Math.min(x1 + 1, imageWidth - 1);
  const y1 = Math.floor(originalY);
  const y2 = Math.min(y1 + 1, imageHeight - 1);

  const dx = originalX - x1;
  const dy = originalY - y1;
  const modifiers = [
    (1 - dx) * (1 - dy),
    dx * (1 - dy),
    (1 - dx) * dy,
    dx * dy,
  ];

  const auxiliarX = [x1, x2].map(value => value * 4);
  const indexes = [y1, y2].reduce((previous, yValue) => {
    const parsedValue = yValue * imageWidth * 4;
    previous.push(...auxiliarX.map(xValue => parsedValue + xValue));

    return previous;
  }, [] as number[]);

  return {
    modifiers,
    indexes,
  } as DataToCalculateValues;
};

const getIterationResultValue = (
  iterationIndex: number,
  imageData: Uint8ClampedArray,
  { modifiers, indexes }: DataToCalculateValues,
) =>
  indexes.reduce(
    (previous, current, ind) =>
      previous + modifiers[ind] * imageData[current + iterationIndex],
    0,
  );
