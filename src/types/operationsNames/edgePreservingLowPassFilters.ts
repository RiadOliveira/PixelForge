export const EDGE_PRESERVING_LOW_PASS_FILTERS = {
  KAWAHARA: 'Kawahara',
  TOMITA_AND_TSUJI: 'Tomita e Tsuji',
  NAGAOE_MATSUYAMA: 'Nagaoe Matsuyama',
  SOMBOONKAEW: 'Somboonkaew',
} as const;

export type EdgePreservingLowPassFiltersKey =
  keyof typeof EDGE_PRESERVING_LOW_PASS_FILTERS;
