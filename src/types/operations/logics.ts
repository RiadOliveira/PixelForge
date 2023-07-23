export const LOGICS_OPERATIONS = {
  AND: 'And',
  OR: 'Or',
  XOR: 'Xor',
} as const;

export type LogicOperationKey = keyof typeof LOGICS_OPERATIONS;
