import {ConditionFn} from "./types";

function negateFunction(fn: ConditionFn): ConditionFn {
  return function(...args: any[]): boolean {
    return !fn(...args);
  }
}

export {negateFunction};
