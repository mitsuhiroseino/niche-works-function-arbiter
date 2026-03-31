import type { LooseFunction } from '@niche-works/types';
import { CANCEL } from '../constants';
import FunctionArbiterBase from '../FunctionArbiterBase';
import type { ArbiterFunction, AwaitedReturn } from '../types';
import { CapacityArbiterType } from './constants';
import type { CapacityArbiterOptions } from './types';

/**
 * 上限付き実行破棄ストラテジー\
 * 同時実行できる上限数（limit）を設け、その範囲内で並行実行する\
 * 上限に達している状態で呼ばれた関数は破棄される
 */
export default class CapacityArbiter extends FunctionArbiterBase<CapacityArbiterType> {
  /**
   * 同時実行の上限数
   */
  private _limit: number;

  constructor(options: CapacityArbiterOptions) {
    super(options);
    // デフォルトは 4 枠
    this._limit = options.limit ?? 4;
  }

  /**
   * 関数をラップする
   * 実行枠がいっぱいの場合は undefined を返して即終了する
   */
  _wrap<T extends LooseFunction>(fn: T): ArbiterFunction<T> {
    const me = this;
    const execute = me._createExecutionFn(fn);

    return (scope: unknown, args: Parameters<T>): AwaitedReturn<T> => {
      // 現在の実行数が上限に達しているかチェック
      if (me.running >= me._limit) {
        // 実行せずに終了
        return Promise.resolve(CANCEL);
      }

      // 枠が空いていれば非同期で実行を開始
      return execute(scope, args);
    };
  }
}
