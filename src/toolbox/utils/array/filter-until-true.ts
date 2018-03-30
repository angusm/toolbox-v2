import {filterUntilFalse} from './filter-until-false';

function filterUntilTrue<T>(
  values: T[], conditionFn: (value: T, index: number) => boolean
): T[] {
  return filterUntilFalse(values, (v: T, i: number) => !conditionFn(v, i));
}

export {filterUntilTrue};
