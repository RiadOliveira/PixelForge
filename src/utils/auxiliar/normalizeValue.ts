const MIN_RGBA_VALUE = 0;
const MAX_RGBA_VALUE = 255;

export const normalizeValue = (valueToNormalize: number) =>
  Math.min(
    Math.max(Math.abs(valueToNormalize), MIN_RGBA_VALUE),
    MAX_RGBA_VALUE,
  );
