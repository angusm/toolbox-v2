function some<T>(
  iterableIterator: IterableIterator<T>,
  filterFn: (v: T) => boolean
): boolean {
  let nextEntry = iterableIterator.next();
  while (!nextEntry.done) {
    if (filterFn(nextEntry.value)) {
      return true;
    }
    nextEntry = iterableIterator.next();
  }
  return false;
}

export {some};
