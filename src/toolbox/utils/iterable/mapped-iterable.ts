import {MappedIterator} from '../iterator/mapped-iterator';

class MappedIterable<T> implements Iterable<T> {
  private iterable: Iterable<T>;
  private mapFunction: (T) => T;

  constructor(iterable: Iterable<T>, mapFunction: (T) => T) {
    this.iterable = iterable;
    this.mapFunction = mapFunction;
  }

  [Symbol.iterator](): Iterator<T> {
    return new MappedIterator(
      this.iterable[Symbol.iterator](), this.mapFunction);
  }
}

export {MappedIterable};