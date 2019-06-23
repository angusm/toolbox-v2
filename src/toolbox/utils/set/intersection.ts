function intersect<T>(...sets: Set<T>[]): Set<T> {
  const result = new Set<T>();
  sets[0].forEach((value) => {
    if (sets.every((set) => set.has(value))) {
      result.add(value);
    }
  });
  return result;
}

export {intersect};
