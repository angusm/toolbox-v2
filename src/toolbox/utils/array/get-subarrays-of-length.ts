function getSubarraysOfLength<T>(value: T[], length: number): T[][] {
  const result = [];
  while (value.length) {
    result.push(value.slice(0, length));
    value = value.slice(length)
  }
  return result;
}

export {getSubarraysOfLength};
