function pushOnArray<T>(
  array: T[],
  iterableIterator: IterableIterator<T>
): T[] {
  let nextEntry = iterableIterator.next();
  while (!nextEntry.done) {
    array.push(nextEntry.value);
    nextEntry = iterableIterator.next();
  }
  return array;
}

export {pushOnArray};
