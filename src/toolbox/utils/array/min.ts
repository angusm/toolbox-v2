function min<T>(values: T[], scoreFn: (v: T) => number): T {
  let minValue = undefined;
  let minScore = Number.POSITIVE_INFINITY;
  values.forEach((value) => {
    const score = scoreFn(value);
    if (minScore > score) {
      minValue = value;
      minScore = score;
    }
  });
  return minValue;
}

export {min};
