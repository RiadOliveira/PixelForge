export const HIGH_PASS_FILTERS = {
  H1: 'H1',
  H2: 'H2',
  M1: 'M1',
  M2: 'M2',
  M3: 'M3',
  HIGHT_BOOST: 'Alto-reforço',
} as const;

export type HighPassFiltersKey = keyof typeof HIGH_PASS_FILTERS;
