function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export {unique};
