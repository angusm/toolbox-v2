import {max} from './max';

function min<T>(values: T[], scoreFn: (v: T) => number): T {
  return max<T>(values, (value: T) => -scoreFn(value));
}

export {min};
