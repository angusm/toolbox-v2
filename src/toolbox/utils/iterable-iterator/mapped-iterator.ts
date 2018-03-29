class MappedIterator<T, TT> implements IterableIterator<TT> {
  private iterator: Iterator<T>;
  private mapFunction: (val: T) => TT;

  constructor(iterator: Iterator<T>, mapFunction: (val: T) => TT) {
    this.iterator = iterator;
    this.mapFunction = mapFunction;
  }

  public next(): IteratorResult<TT> {
    const nextValue = this.iterator.next();
    return {
      done: nextValue.done,
      value: this.mapFunction(nextValue.value)
    };
  }

  [Symbol.iterator](): MappedIterator<T, TT> {
    return this;
  }
}

export {MappedIterator};
