function forEach<T extends Node>(
  values: NodeListOf<T>,
  callback: (value: T) => void
): void {
  const listLength = values.length;
  for (let i = 0; i < listLength; i++) {
    callback(values[i]);
  }
}

export {forEach};
