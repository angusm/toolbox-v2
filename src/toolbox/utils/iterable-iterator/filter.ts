function filter<T>(
  iterableIterator: IterableIterator<T>,
  filterFn: (v: T) => boolean
): T[] {
  const result = [];
  let nextEntry = iterableIterator.next();
  while (!nextEntry.done) {
    if (filterFn(nextEntry.value)) {
      result.push(nextEntry.value);
    }
    nextEntry = iterableIterator.next();
  }
  return result;
}

export {filter};
