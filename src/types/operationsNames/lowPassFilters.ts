export const LOW_PASS_FILTERS = {
  AVERAGE: 'Média',
  MEDIAN: 'Mediana',
  MAXIMUM: 'Máximo',
  MINIMUM: 'Mínimo',
  MODE: 'Moda',
} as const;

export type LowPassFiltersKey = keyof typeof LOW_PASS_FILTERS;
