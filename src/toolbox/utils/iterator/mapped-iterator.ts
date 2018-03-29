class MappedIterator<T> implements Iterator<T> {
  private iterator: Iterator<T>;
  private mapFunction: (T) => T;

  constructor(iterable, mapFunction) {
    this.iterator = iterable;
    this.mapFunction = mapFunction;
  }

  public next(): IteratorResult<any> {
    const nextValue = this.iterator.next();
    return {
      done: nextValue.done,
      value: this.mapFunction(nextValue.value)
    };
  }
}

export {MappedIterator};