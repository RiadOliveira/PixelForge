export const THRESHOLDING_OPERATIONS = {
  GLOBAL: 'Global',
  LOCAL_AVERAGE: 'Local - Média',
  LOCAL_MEDIAN: 'Local - Mediana',
  LOCAL_MIN_MAX: 'Local - MinMax',
  LOCAL_NIBLACK: 'Local - Niblack',
} as const;

export type ThresholdingOperationKey = keyof typeof THRESHOLDING_OPERATIONS;
