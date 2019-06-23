function subtract<T>(minuend: Set<T>, subtrahend: Set<T>): Set<T> {
  const result = new Set<T>();
  minuend.forEach((value) => {
    if (!subtrahend.has(value)) {
      result.add(value);
    }
  });
  return result;
}

export {subtract};
