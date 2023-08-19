export const NOT_LINEAR_GRAYSCALE_OPERATIONS = {
  LOGARITHMIC: 'Logarítmica',
  SQUARE_ROOT: 'Raíz quadrada',
  EXPONENTIAL: 'Exponencial',
  SQUARE: 'Quadrado',
  BINARY: 'Binário',
  REVERSE: 'Inverso',
};

export type NotLinearGrayscaleOperationKey =
  keyof typeof NOT_LINEAR_GRAYSCALE_OPERATIONS;
