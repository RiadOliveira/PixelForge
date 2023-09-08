export const HALFTONING_FILTERS = {
  DOTTED_ORDERED_2x2: 'Pontilhado Ordenado 2x2',
  DOTTED_ORDERED_2x3: 'Pontilhado Ordenado 2x3',
  DOTTED_ORDERED_3x3: 'Pontilhado Ordenado 3x3',
  ROGERS: 'Rogers',
  FLOYD_STEINBERG: 'Floyd e Steinberg',
  JARVIS_JUDICE_NINKE: 'Jarvis, Judice & Ninke',
  STUCKI: 'Stucki',
  STEVENSONE_ARCE: 'Stevensone Arce',
} as const;

export type HalftoningFilterKey = keyof typeof HALFTONING_FILTERS;
