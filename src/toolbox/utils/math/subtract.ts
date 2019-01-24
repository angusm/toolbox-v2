function subtract(...values: number[]): number {
  return values.slice(1).reduce((result, value) => result - value, values[0]);
}

export {subtract};
