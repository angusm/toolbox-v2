import {NumericFn} from "./types";

function negateNumericFunction(fn: NumericFn): NumericFn {
  return function(...args: any[]): number {
    return -1 * fn(...args);
  }
}

export {negateNumericFunction};
