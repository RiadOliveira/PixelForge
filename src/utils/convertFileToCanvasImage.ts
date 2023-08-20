import { drawImageOnCanvas } from './auxiliar/drawImageOnCanvas';
import { Image as ImageJs } from 'image-js';
import { generateResultCanvasData } from './auxiliar/generateResultCanvasData';

export const convertFileToCanvasImage = (
  file: File,
): Promise<HTMLCanvasElement> => {
  const fileType = file.name.split('.')[1];

  switch (fileType) {
    case 'pgm':
      return convertPGMImages(file);
    case 'tiff':
      return convertTIFFImages(file);
    default:
      return convertDefaultImageFormats(file);
  }
};

const convertPGMImages = (file: File): Promise<HTMLCanvasElement> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const pgmData = event.target!.result as string;
      resolve(convertPGMDataToCanvas(pgmData));
    };

    reader.onerror = () => reject(new Error());
    reader.readAsText(file);
  });

const convertPGMDataToCanvas = (pgmData: string) => {
  const lines = pgmData.trim().split('\n');

  const [_header, widthHeight, _maxVal, ...pixelDataArray] = lines;
  const [width, height] = widthHeight.split(' ').map(Number);

  const { canvas, context, imageData } = generateResultCanvasData(
    width,
    height,
  );

  const pixelArray = pixelDataArray
    .map(line => line.trim().split(' ').map(Number))
    .flat();
  const pixelCount = pixelArray.length;

  for (let i = 0, j = 0; i < pixelCount; i++, j += 4) {
    const pixelValue = pixelArray[i];
    imageData.data[j] = pixelValue;
    imageData.data[j + 1] = pixelValue;
    imageData.data[j + 2] = pixelValue;
    imageData.data[j + 3] = 255;
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
};

const convertTIFFImages = (file: File): Promise<HTMLCanvasElement> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const arrayBuffer = event.target!.result as ArrayBuffer;
      convertTIFFArrayBufferToCanvas(arrayBuffer).then(resolve);
    };

    reader.onerror = () => reject(new Error());
    reader.readAsArrayBuffer(file);
  });

const convertTIFFArrayBufferToCanvas = async (arrayBuffer: ArrayBuffer) => {
  const image = await ImageJs.load(arrayBuffer);
  const { width, height } = image;

  const { canvas, context, imageData } = generateResultCanvasData(
    width,
    height,
  );

  const pixelData = image.data;
  const pixelDataLength = pixelData.length;

  for (let i = 0, j = 0; i < pixelDataLength; i++, j += 4) {
    imageData.data[j] = pixelData[i++];
    imageData.data[j + 1] = pixelData[i++];
    imageData.data[j + 2] = pixelData[i++];
    imageData.data[j + 3] = pixelData[i];
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
};

const convertDefaultImageFormats = (file: File): Promise<HTMLCanvasElement> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement('canvas');

        drawImageOnCanvas(image, canvas);
        resolve(canvas);
      };
      image.onerror = () => reject(new Error());

      image.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error());
    reader.readAsDataURL(file);
  });
