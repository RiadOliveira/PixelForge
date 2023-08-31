export const LINEAR_GRAYSCALE_OPERATIONS = {
  NEW_INTERVAL: 'Novo intervalo',
  BY_PARTS: 'Por partes',
} as const;

export type LinearGrayscaleOperationKey =
  keyof typeof LINEAR_GRAYSCALE_OPERATIONS;
