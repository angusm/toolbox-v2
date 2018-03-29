import {MappedIterator} from '../iterable-iterator/mapped-iterator';

class MappedIterable<T, TT> implements Iterable<TT> {
  private iterable: Iterable<T>;
  private mapFunction: (value: T) => TT;

  constructor(iterable: Iterable<T>, mapFunction: (value: T) => TT) {
    this.iterable = iterable;
    this.mapFunction = mapFunction;
  }

  [Symbol.iterator](): MappedIterator<T, TT> {
    return new MappedIterator<T, TT>(
      this.iterable[Symbol.iterator](), this.mapFunction);
  }
}

export {MappedIterable};