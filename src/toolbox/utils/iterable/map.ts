class MappedIterable implements Iterable {
  private iterable: Iterable<any>;
  private mapFunction: (any) => any;

  constructor(iterable, mapFunction) {
    this.iterable = iterable;
    this.mapFunction = mapFunction;
  }

  public next(): any {
    const nextValue = this.iterable.next();
    return {
      done: nextValue.done,
      value: this.mapFunction(nextValue.value)
    };
  }
}

function mapIterator(iterable, mapFunction) {
  return {
    next: () =>
  }
  let done = false;
  while (!done) {
    const next = iterable.next();
    const value = next.value;
    done = next.done;
    yield
  }
}

export {mapIterator};