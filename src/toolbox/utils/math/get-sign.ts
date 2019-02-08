function getSign(value: number): number {
  return value === 0 ? 0 : value / Math.abs(value);
}

export {getSign};
