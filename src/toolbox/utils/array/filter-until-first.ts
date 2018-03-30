import {filterUntilTrue} from './filter-until-true';

function filterUntilFirst<T>(
  values: T[], conditionFn: (value: T, index: number) => boolean
): T[] {
  const results: T[] = filterUntilTrue(values, conditionFn);
  if (results.length < values.length) {
    return [...results, values[results.length]];
  } else {
    return results;
  }
}

export {filterUntilFirst};
