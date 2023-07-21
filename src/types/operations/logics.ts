export const LOGICS_OPERATIONS = {
  AND: 'AND',
  OR: 'OR',
  XOR: 'XOR',
} as const;

export type LogicOperationKey = keyof typeof LOGICS_OPERATIONS;
