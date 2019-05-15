import {DynamicDefaultMap} from "../map/dynamic-default";
import {filter} from "../iterable-iterator/filter";

function intersect<T>(...arrays: T[][]): T[] {
  const counts = DynamicDefaultMap.usingFunction<T, number>(() => 0);

  arrays.forEach(
    (array) => {
      array.forEach((value) => counts.set(value, counts.get(value) + 1));
    });

  const arrayCount = arrays.length;
  const validValuesWithCounts =
    filter<[T, number]>(
      counts.entries(), ([value, count]) => count === arrayCount);

  return validValuesWithCounts.map(([value, unused]) => value);
}

export {intersect};
