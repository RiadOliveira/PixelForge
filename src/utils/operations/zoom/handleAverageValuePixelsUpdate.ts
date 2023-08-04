interface DataToCalculateValues {
  rgbaTotalValues: number[];
  pixelsQuantity: number;
}

export const handleAverageValuePixelsUpdate = (
  [
    { width: resultWidth, height: resultHeight },
    { width: imageWidth, height: imageHeight },
  ]: HTMLCanvasElement[],
  [resultData, imageData]: Uint8ClampedArray[],
  zoomFactor: number,
) => {
  for (let x = 0; x < resultWidth; x++) {
    for (let y = 0; y < resultHeight; y++) {
      const startX = Math.floor(x / zoomFactor);
      const startY = Math.floor(y / zoomFactor);
      const endX = Math.min(startX + 1, imageWidth - 1);
      const endY = Math.min(startY + 1, imageHeight - 1);

      const { pixelsQuantity, rgbaTotalValues } =
        getDataToCalculateResultValues(imageData, imageWidth, [
          startX,
          startY,
          endX,
          endY,
        ]);

      const resultIndex = (y * resultWidth + x) * 4;
      for (let ind = 0; ind < 4; ind++) {
        resultData[resultIndex + ind] = rgbaTotalValues[ind] / pixelsQuantity;
      }
    }
  }
};

const getDataToCalculateResultValues = (
  imageData: Uint8ClampedArray,
  imageWidth: number,
  [startX, startY, endX, endY]: number[],
) => {
  const rgbaTotalValues = [0, 0, 0, 0];

  for (let i = startX; i <= endX; i++) {
    for (let j = startY; j <= endY; j++) {
      const parsedIndex = (j * imageWidth + i) * 4;

      for (let rgbaInd = 0; rgbaInd < 4; rgbaInd++) {
        rgbaTotalValues[rgbaInd] += imageData[parsedIndex + rgbaInd];
      }
    }
  }

  return {
    rgbaTotalValues,
    pixelsQuantity: (endX - startX + 1) * (endY - startY + 1),
  } as DataToCalculateValues;
};
