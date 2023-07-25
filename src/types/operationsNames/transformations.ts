export const TRANSFORMATIONS = {
  ROTATION: 'Rotação',
  TRANSLATION: 'Translação',
  SCALE: 'Escala',
  HORIZONTAL_REFLECTION: 'Reflexão Horizontal',
  VERTICAL_REFLECTION: 'Reflexão Vertical',
  SHEARING: 'Cisalhamento',
};

export type TransformationKey = keyof typeof TRANSFORMATIONS;
