function merge<T>(...sets: Set<T>[]): Set<T> {
  return new Set(
    Array.from(sets)
      .reduce(
        (allValues, set) => [...allValues, ...Array.from(set.values())],
        []
      )
  );
}

export {merge};
