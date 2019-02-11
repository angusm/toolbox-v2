function zip<T>(...iterators: Iterator<T>[]): IterableIterator<T[]> {
  function* iterator() {
    while (true) {
      const results: T[] =
        iterators
          .map((list) => list.next())
          .filter((nextValue) => !nextValue.done)
          .filter((nextValue) => nextValue.value)
          .map((nextValue) => nextValue.value);

      if (!results.length) {
        break;
      }

      yield results;
    }
  }

  return iterator();
}

export {zip};
