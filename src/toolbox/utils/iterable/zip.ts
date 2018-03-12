function zip(...lists: Array<Iterable<any>>): Iterable<Iterable<any>> {
  const listsAsIterators = lists.map((list) => list[Symbol.iterator]());

  function* iterator() {
    while (true) {
      const result =
        listsAsIterators
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