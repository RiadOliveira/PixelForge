import { OperationKey } from 'types/operationsNames';
import { OperationData } from './OperationData';

export type OperationFunction<T extends OperationKey> = (
  images: HTMLCanvasElement[],
  operationsData: OperationData<T>[],
  normalizeValues?: boolean,
) => HTMLCanvasElement[];
