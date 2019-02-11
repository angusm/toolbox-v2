type defaultValueFn<T> = (index: number) => T;
const defaultDefaultValueFn: () => null = () => null;

function generateFilledArray<T>(
  length: number,
  defaultValueFn: defaultValueFn<T> = defaultDefaultValueFn
): T[] {
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = defaultValueFn(i);
  }

  return result;
}

export {generateFilledArray};
