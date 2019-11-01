function getPreviousValue<T>(values: T[], index: number): T {
  return values[Math.min(index + 1, values.length - 1)];
}

export {getPreviousValue};
