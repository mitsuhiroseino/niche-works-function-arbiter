import type { FunctionArbiterBaseOptions } from '../FunctionArbiterBase';
import { CapacityArbiterType } from './constants';

export type CapacityArbiterOptions =
  FunctionArbiterBaseOptions<CapacityArbiterType> & {
    limit?: number;
  };
