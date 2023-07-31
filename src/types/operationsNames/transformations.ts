export const TRANSFORMATIONS = {
  ROTATION: 'Rotação',
  TRANSLATION: 'Translação',
  SCALE: 'Escala',
  HORIZONTAL_REFLECTION: 'Reflexão Horizontal',
  VERTICAL_REFLECTION: 'Reflexão Vertical',
  X_SHEARING: 'Cisalhamento em X',
  Y_SHEARING: 'Cisalhamento em Y',
};

export type TransformationKey = keyof typeof TRANSFORMATIONS;
