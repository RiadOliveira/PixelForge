export const ZOOM_OPERATIONS = {
  ZOOM_IN_REPLICATION: 'Zoom In - Replicação',
  ZOOM_IN_INTERPOLATION: 'Zoom In - Interpolação',
  ZOOM_OUT_EXCLUSION: 'Zoom Out - Exclusão',
  ZOOM_OUT_AVERAGE_VALUE: 'Zoom Out - Valor Médio',
} as const;

export type ZoomOperationKey = keyof typeof ZOOM_OPERATIONS;
