import { rgb } from 'color-convert';

export const rgbToHsb = ([r, g, b]: number[]) => rgb.hsv([r, g, b]);

export const rgbToYuv = ([r, g, b]: number[]) => {
  const y = 0.299 * r + 0.587 * g + 0.114 * b;
  const u = (b - y) * 0.565;
  const v = (r - y) * 0.713;

  return [y / 255, u / 255, v / 255];
};

export const rgbToCmyk = ([r, g, b]: number[]) => rgb.cmyk([r, g, b]);
