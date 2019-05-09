function map<T extends Node, V>(
  values: NodeListOf<T>,
  callback: (value: T) => V
): V[] {
  const listLength = values.length;
  const result: V[] = new Array(listLength);
  for (let i = 0; i < listLength; i++) {
    result[i] = callback(values[i]);
  }
  return result;
}

export {map};
