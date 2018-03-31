import {isDef} from '../is-def';

function isNewMaxScore<T>(
  currentMaxValue: T, maxScore: number, score: number
): boolean {
  return (!isDef(currentMaxValue) && !isDef(maxScore)) || maxScore < score;
}

function max<T>(values: T[], scoreFn: (v: T) => number): T {
  return Array.from(values).reduce(
    ([maxValue, maxScore], value: T) => {
      const score = scoreFn(value);
      return isNewMaxScore<T>(maxValue, maxScore, score) ?
        [value, score] :
        [maxValue, maxScore];
    },
    [undefined, undefined]
  )[0];
}

export {max};