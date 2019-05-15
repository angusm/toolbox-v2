function pushOnArray<T>(array: T[], values: T[]) {
  array.push.apply(array, values);
  return array;
}

export {pushOnArray};
