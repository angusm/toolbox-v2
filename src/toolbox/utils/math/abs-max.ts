function absMax(...numbers: number[]): number {
  return Math.max(...numbers.map((n) => Math.abs(n)));
}

export {absMax};
