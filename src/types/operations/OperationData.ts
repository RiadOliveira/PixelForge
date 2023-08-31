import { OperationKey } from 'types/operationsNames';

export interface OperationData<T extends OperationKey = OperationKey> {
  key: T;
  values: number[];
}
