function min<T>(values: T[], ...scoreFns: ((v: T) => number)[]): T {
  let minValue: T = undefined;
  let minScore: number = Number.POSITIVE_INFINITY;

  const scoreFn = scoreFns[0];

  values.forEach((value) => {
    const score = scoreFn(value);
    if (minScore > score) {
      minValue = value;
      minScore = score;
    } else if (minScore === score && scoreFns.length > 1) {
      let i = 1;
      let tieBreaker = scoreFns[i];
      while (
        i < scoreFns.length && tieBreaker(minValue) === tieBreaker(value)
      ) {
        tieBreaker = scoreFns[i++];
      }

      if (tieBreaker(minValue) > tieBreaker(value)) {
        minValue = value;
      }
    }
  });
  return minValue;
}

export {min};
