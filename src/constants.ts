import { CapacityArbiterType } from './CapacityArbiter/constants';
import { DebounceArbiterType } from './DebounceArbiter/constants';
import { ExclusiveArbiterType } from './ExclusiveArbiter/constants';
import { ParallelArbiterType } from './ParallelArbiter/constants';
import { SerialArbiterType } from './SerialArbiter/constants';
import { ThrottleArbiterType } from './ThrottleArbiter/constants';

export const ArbiterType = {
  [CapacityArbiterType]: CapacityArbiterType,
  [DebounceArbiterType]: DebounceArbiterType,
  [ExclusiveArbiterType]: ExclusiveArbiterType,
  [ParallelArbiterType]: ParallelArbiterType,
  [SerialArbiterType]: SerialArbiterType,
  [ThrottleArbiterType]: ThrottleArbiterType,
} as const;

export type ArbiterType = (typeof ArbiterType)[keyof typeof ArbiterType];

/**
 * キャンセル時に返す戻り値
 */
export const CANCEL = Symbol('cancel');
