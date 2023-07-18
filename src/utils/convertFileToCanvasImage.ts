/* eslint-disable @typescript-eslint/no-use-before-define */
import { drawImageOnCanvas } from './auxiliar/drawImageOnCanvas';
import { Image as ImageJs } from 'image-js';

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

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d')!;

  const pixelArray = pixelDataArray
    .map(line => line.trim().split(' ').map(Number))
    .flat();

  const imageData = context.createImageData(canvas.width, canvas.height);
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

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d')!;

  const imageData = context.createImageData(width, height);
  const pixelData = image.data;

  const imageDataData = imageData.data;
  const pixelDataLength = pixelData.length;

  for (let i = 0, j = 0; i < pixelDataLength; i++, j += 4) {
    imageDataData[j] = pixelData[i++];
    imageDataData[j + 1] = pixelData[i++];
    imageDataData[j + 2] = pixelData[i++];
    imageDataData[j + 3] = pixelData[i];
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

        drawImageOnCanvas(canvas, image);
        resolve(canvas);
      };
      image.onerror = () => reject(new Error());

      image.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error());
    reader.readAsDataURL(file);
  });
