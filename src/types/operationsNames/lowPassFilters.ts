export const LOW_PASS_FILTERS = {
  AVERAGE: 'Média',
  MEDIAN: 'Mediana',
  MAXIMUM: 'Máximo',
  MINIMUM: 'Mínimo',
  MODE: 'Moda',
  KAWAHARA: 'Kawahara',
  TOMITA_TSUJI: 'Tomita e Tsuji',
  NAGAOE_MATSUYAMA: 'Nagaoe Matsuyama',
  SOMBOONKAEW: 'Somboonkaew',
} as const;

export type LowPassFilterKey = keyof typeof LOW_PASS_FILTERS;
