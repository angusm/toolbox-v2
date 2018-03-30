function sum(...values: number[]): number {
  return values.reduce((result, value) => result + value, 0);
}

export {sum};
