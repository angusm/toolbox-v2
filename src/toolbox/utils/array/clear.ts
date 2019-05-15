// Useful to re-use arrays rather than re-assigning to an empty array

function clear<T>(values: T[]): T[] {
  while (values.length) {
    values.pop();
  }
  return values;
}

export {clear};
