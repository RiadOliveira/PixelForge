import { OperationParams } from './OperationParams';

export type OperationFunction = (
  params: OperationParams,
) => HTMLCanvasElement[];
