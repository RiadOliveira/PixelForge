export const ARITHMETICS_OPERATIONS = {
  ADDITION: 'Adição',
  SUBTRACTION: 'Subtração',
  DIVISION: 'Divisão',
  MULTIPLICATION: 'Multiplicação',
} as const;

export type ArithmeticOperationKey = keyof typeof ARITHMETICS_OPERATIONS;
