import {max} from './max';

function min<T>(iterable: Iterable<T>, scoreFn: (v: T) => number): T {
  return max<T>(iterable, (value: T) => -scoreFn(value));
}

export {min};
