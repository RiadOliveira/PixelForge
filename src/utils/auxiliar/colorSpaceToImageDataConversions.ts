const parseComponent = (component: number) => Math.round(component * 255);

export const convertRgbToImageData = ([r, g, b]: number[]) => [
  [r, 0, 0],
  [0, g, 0],
  [0, 0, b],
];

export const convertHsbToImageData = ([h, s, b]: number[]) =>
  [
    [h, 1, 1],
    [0, s, 1],
    [0, 1, b],
  ].map(hsbToRgb);

const hsbToRgb = ([h, s, b]: number[]) => {
  const c = b * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = b - c;

  const [red, green, blue] = (() => {
    switch (true) {
      case h >= 0 && h < 60:
        return [c, x, 0];
      case h >= 60 && h < 120:
        return [x, c, 0];
      case h >= 120 && h < 180:
        return [0, c, x];
      case h >= 180 && h < 240:
        return [0, x, c];
      case h >= 240 && h < 300:
        return [x, 0, c];
      case h >= 300 && h < 360:
        return [c, 0, x];
      default:
        return [0, 0, 0];
    }
  })();

  return [red + m, green + m, blue + m].map(parseComponent);
};

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

export const convertCmykToImageData = ([c, m, y, k]: number[]) => {
  const [parsedC, parsedM, parsedY, parsedK] = [1 - c, 1 - m, 1 - y, 1 - k].map(
    parseComponent,
  );

  return [
    [parsedC, 255, 255],
    [255, parsedM, 255],
    [255, 255, parsedY],
    [parsedK, parsedK, parsedK],
  ];
};
