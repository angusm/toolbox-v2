import {ConditionFn} from "./types";

function andConditionFunctions(...cndFns: ConditionFn[]): ConditionFn {
  return function(...args: any[]): boolean {
    return cndFns.every((cndFn) => cndFn(...args));
  }
}

export {andConditionFunctions};
