import { LowPassFilterKey } from 'types/operationsNames/lowPassFilters';

export const isLowFilterEdgePreservingKey = (key: LowPassFilterKey) =>
  key === 'KAWAHARA' ||
  key === 'TOMITA_TSUJI' ||
  key === 'NAGAOE_MATSUYAMA' ||
  key === 'SOMBOONKAEW';
