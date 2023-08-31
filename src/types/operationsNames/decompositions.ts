export const DECOMPOSITIONS = {
  RGB: 'RGB',
  HSB: 'HSB',
  YUV: 'YUV',
  CMYK: 'CMYK',
} as const;

export type DecompositionKey = keyof typeof DECOMPOSITIONS;
