export const rgbToHsb = ([r, g, b]: number[]) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  const s = delta / max;
  const v = max / 255;

  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h *= 60;
    if (h < 0) h += 360;
  }

  return [h, s, v];
};

export const rgbToYuv = ([r, g, b]: number[]) => {
  const y = 0.299 * r + 0.587 * g + 0.114 * b;
  const u = (b - y) * 0.565;
  const v = (r - y) * 0.713;

  return [y / 255, u / 255, v / 255];
};

export const rgbToCmyk = ([r, g, b]: number[]) => {
  const parsedMaxRgb = 1 - Math.max(r, g, b) / 255;

  const c = (1 - r / 255 - parsedMaxRgb) / parsedMaxRgb;
  const m = (1 - g / 255 - parsedMaxRgb) / parsedMaxRgb;
  const y = (1 - b / 255 - parsedMaxRgb) / parsedMaxRgb;

  return [c, m, y, parsedMaxRgb];
};
