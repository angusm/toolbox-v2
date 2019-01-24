console.warn(
  'Array split() function has not been thoroughly tested. Use at your own risk.');

function split<T>(
  values: T[],
  splitValue: T,
  limit: number = Number.POSITIVE_INFINITY
): T[][] {
  let remainder = values;
  const result = [];

  while (remainder.indexOf(splitValue) !== -1 && result.length < limit) {
    const splitPosition: number = remainder.indexOf(splitValue);
    const splitPiece: T[] = remainder.slice(0, splitPosition);
    remainder = remainder.slice(splitPosition + 1);
    result.push(splitPiece);
  }

  if (result.length < limit) {
    result.push(remainder);
  }

  return result;
}

export {split};
