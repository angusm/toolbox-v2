function max<T>(values: T[], scoreFn: (v: T) => number): T {
  let maxValue = undefined;
  let maxScore = Number.NEGATIVE_INFINITY;
  values.forEach((value) => {
    const score = scoreFn(value);
    if (maxScore < score) {
      maxValue = value;
      maxScore = score;
    }
  });
  return maxValue;
}

export {max};
