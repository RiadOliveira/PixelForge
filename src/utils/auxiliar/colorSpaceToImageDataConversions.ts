import { cmyk, hsv } from 'color-convert';

const parseComponent = (component: number) => Math.round(component * 255);

export const convertRgbToImageData = ([r, g, b]: number[]) => [
  [r, 0, 0],
  [0, g, 0],
  [0, 0, b],
];

export const convertHsbToImageData = ([h, s, b]: number[]) =>
  [
    [0, 0, (h / 360) * 100],
    [0, 0, s],
    [0, 0, b],
  ].map(([h, s, b]) => hsv.rgb([h, s, b]));

export const convertYuvToImageData = ([y, u, v]: number[]) => {
  const yComponents = [y, y, y].map(parseComponent);
  const uComponents = [0.5, 0.5 - 0.344 * u, 0.5 + 1.77 * u].map(
    parseComponent,
  );
  const vComponents = [0.5 + 1.403 * v, 0.5 - 0.714 * v, 0.5].map(
    parseComponent,
  );

  return [yComponents, uComponents, vComponents];
};

export const convertCmykToImageData = ([c, m, y, k]: number[]) =>
  [
    [c, 0, 0, 0],
    [0, m, 0, 0],
    [0, 0, y, 0],
    [0, 0, 0, k],
  ].map(([c, m, y, k]) => cmyk.rgb([c, m, y, k]));
