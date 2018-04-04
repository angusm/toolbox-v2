import {ConditionFn} from "./types";

function orConditionFunctions(...cndFns: ConditionFn[]): ConditionFn {
  return function(...args: any[]): boolean {
    return cndFns.some((cndFn) => cndFn(...args));
  }
}

export {orConditionFunctions};
