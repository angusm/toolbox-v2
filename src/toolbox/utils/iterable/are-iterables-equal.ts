import {areIteratorsEqual} from '../iterator/are-iterators-equal';

function areIterablesEqual<T>(...iterables: Iterable<T>[]): boolean {
  return areIteratorsEqual(
    ...iterables.map((iterable:Iterable<T>) => iterable[Symbol.iterator]()));
}

export {areIterablesEqual};
