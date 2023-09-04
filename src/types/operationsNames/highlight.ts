export const HIGHLIGHTS = {
  HISTOGRAM_EQUALIZATION: 'Equalização',
  GAMMA_CORRECTION: 'Correção de Gama',
  BIT_SLICING: 'Fatiamento de bits',
} as const;

export type HighlightOperationKey = keyof typeof HIGHLIGHTS;
