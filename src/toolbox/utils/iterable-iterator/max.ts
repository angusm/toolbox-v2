function max<T>(
  iterableIterator: IterableIterator<T>,
  scoreFn: (value: T) => number
): T {
  let maxValue = undefined;
  let maxScore = Number.NEGATIVE_INFINITY;

  let nextEntry = iterableIterator.next();
  while (!nextEntry.done) {
    const score = scoreFn(nextEntry.value);
    if (maxScore < score) {
      maxValue = nextEntry.value;
      maxScore = score;
    }
    nextEntry = iterableIterator.next();
  }

  return maxValue;
}

export {max};
