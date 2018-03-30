function zip<T>(...iterators: Iterator<T>[]): Iterable<Iterable<T>> {
  function* iterator() {
    while (true) {
      const result =
        iterators
          .map((list) => list.next())
          .filter((nextValue) => !nextValue.done)
          .filter((nextValue) => nextValue.value);
      if (!result.length) {
        break;
      }
      yield result;
    }
  }

  return iterator();
}

export {zip};