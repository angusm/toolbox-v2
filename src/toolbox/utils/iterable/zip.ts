import {zip as iteratorZip} from '../iterator/zip';

function zip<T>(...lists: Array<Iterable<T>>): Iterable<Iterable<T>> {
  const listsAsIterators = lists.map((list) => list[Symbol.iterator]());
  return iteratorZip(...listsAsIterators);
}

export {zip};
