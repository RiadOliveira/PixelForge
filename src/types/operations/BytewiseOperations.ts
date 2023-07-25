import { ArithmeticOperationKey } from 'types/operationsNames/arithmetics';
import { LogicOperationKey } from 'types/operationsNames/logics';

export type BytewiseOperationKey = ArithmeticOperationKey | LogicOperationKey;
export type BytewiseOperation = (first?: number, second?: number) => number;

const generateBytewiseFunction = (bytewiseOperation: BytewiseOperation) => {
  return (first?: number, second?: number) => {
    const firstIsUndefined = first === undefined;
    const secondIsUndefined = second === undefined;

    if (!firstIsUndefined && !secondIsUndefined) {
      return bytewiseOperation(first, second);
    }
    return first ?? second ?? 255;
  };
};

export const BYTEWISE_OPERATIONS: {
  [key in BytewiseOperationKey]: BytewiseOperation;
} = {
  ADDITION: generateBytewiseFunction((first, second) => first! + second!),
  DIVISION: generateBytewiseFunction((first, second) => first! / second!),
  MULTIPLICATION: generateBytewiseFunction((first, second) => first! * second!),
  SUBTRACTION: generateBytewiseFunction((first, second) => first! - second!),
  AND: generateBytewiseFunction((first, second) => first! & second!),
  OR: generateBytewiseFunction((first, second) => first! | second!),
  XOR: generateBytewiseFunction((first, second) => first! ^ second!),
} as const;
