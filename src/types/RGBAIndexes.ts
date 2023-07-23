export const RGBAIndexes = {
  RED: 0,
  GREEN: 1,
  BLUE: 2,
  ALPHA: 3,
} as const;

export type RGBAKey = keyof typeof RGBAIndexes;
export type RGBKey = Exclude<RGBAKey, 'ALPHA'>;
