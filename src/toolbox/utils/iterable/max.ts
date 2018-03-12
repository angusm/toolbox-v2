import {isDef} from '../is-def';

function isNewMaxScore(currentMaxValue: any, maxScore: number, score: number) {
  return (!isDef(currentMaxValue) && !isDef(maxScore)) || maxScore < score;
}

function max(iterable: Iterable<any>, scoreFn: (v: any) => number): any {
  return Array.from(iterable).reduce(
    ([maxValue, maxScore], value: any) => {
      const score = scoreFn(value);
      return isNewMaxScore(maxValue, maxScore, score) ?
        [value, score] :
        [maxValue, maxScore];
    },
    [undefined, undefined]
  )[0];
}

export {max};