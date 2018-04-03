import {first} from './first';

function find<T>(iterator: Iterator<T>, evaluationFn: (t: T) => boolean): T {
  return first<T>(iterator, evaluationFn);
}

export {find};
