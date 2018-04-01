function flatten<T>(values: T[][]): T[] {
  return values.reduce((result, subArray) => result.concat(subArray), []);
}

export {flatten};
