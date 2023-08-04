export const handleReplicationOrExclusionPixelsUpdate = (
  [
    { width: resultWidth, height: resultHeight },
    { width: imageWidth },
  ]: HTMLCanvasElement[],
  [resultData, imageData]: Uint8ClampedArray[],
  zoomFactor: number,
) => {
  for (let x = 0; x < resultWidth; x++) {
    for (let y = 0; y < resultHeight; y++) {
      const originalX = Math.floor(x / zoomFactor);
      const originalY = Math.floor(y / zoomFactor);

      const resultIndex = (y * resultWidth + x) * 4;
      const imageIndex = (originalY * imageWidth + originalX) * 4;

      transferPixelDataFromImageToResultCanvas(
        [resultData, imageData],
        [resultIndex, imageIndex],
      );
    }
  }
};

const transferPixelDataFromImageToResultCanvas = (
  [resultData, imageData]: Uint8ClampedArray[],
  [resultIndex, imageIndex]: number[],
) => {
  for (let ind = 0; ind < 4; ind++) {
    resultData[resultIndex + ind] = imageData[imageIndex + ind];
  }
};
