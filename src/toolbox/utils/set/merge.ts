function merge<T>(...sets: Set<T>[]): Set<T> {
  const result = new Set();
  sets.forEach((set) => {
    set.forEach((value) => {
      result.add(value);
    });
  });
  return result;
}

export {merge};
