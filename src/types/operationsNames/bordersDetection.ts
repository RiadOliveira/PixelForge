export const BORDERS_DETECTION = {
  ROBERTS: 'Roberts',
  ROBERTS_CROSSED: 'Roberts cruzado',
  PREWIIT_GX: 'Prewiit Gx',
  PREWIIT_GY: 'Prewiit Gy',
  PREWIIT_MAGNITUDE: 'Prewiit magnitude',
  SOBEL_GX: 'Sobel Gx',
  SOBEL_GY: 'Sobel Gy',
  SOBEL_MAGNITUDE: 'Sobel magnitude',
  KRISH: 'Krish',
  ROBISON: 'Robison',
  FREY_CHEN: 'Frey-Chen',
  LAPLACIANO_H1: 'Laplaciano H1',
  LAPLACIANO_H2: 'Laplaciano H2',
} as const;

export type BordersDetectionKey = keyof typeof BORDERS_DETECTION;
