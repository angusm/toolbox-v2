function filterUntilFalse<T>(
  values: T[], conditionFn: (value: T, index: number) => boolean
): T[] {
  let index: number = 0;
  while (index < values.length && conditionFn(values[index], index)) {
    index++;
  }
  return values.slice(0, index);
}

export {filterUntilFalse};
