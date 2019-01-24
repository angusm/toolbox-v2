function intersect<T>(...sets: Set<T>[]): Set<T> {
  return new Set(
    Array.from(sets[0].values())
      .filter((value) => sets.slice(1).every((set) => set.has(value))));
}

export {intersect};
