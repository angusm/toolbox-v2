function subtract<T>(minuend: T[], subtrahend: T[]): T[] {
  return minuend.filter((value) => subtrahend.indexOf(value) === -1);
}

export {subtract};
