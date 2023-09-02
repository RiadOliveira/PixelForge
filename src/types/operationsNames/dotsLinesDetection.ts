export const DOTS_LINES_DETECTION = {
  DOTS: 'Pontos',
  HORIZONTAL_LINES: 'Linhas Horizontais',
  VERTICAL_LINES: 'Linhas Verticais',
  LINES_45_DEGREES: 'Linhas em 45 graus',
  LINES_135_DEGREES: 'Linhas em 135 graus',
} as const;

export type DotsLinesDetectionKey = keyof typeof DOTS_LINES_DETECTION;
