import {max as max_} from '../array/max';

function max<T>(iterable: Iterable<T>, scoreFn: (v: T) => number): T {
  return max_<T>(Array.from(iterable), scoreFn);
}

export {max};