import type { FunctionArbiterBaseOptions } from '../FunctionArbiterBase';
import { ParallelArbiterType } from './constants';

export type ParallelArbiterOptions =
  FunctionArbiterBaseOptions<ParallelArbiterType> & {
    limit: number;
  };
