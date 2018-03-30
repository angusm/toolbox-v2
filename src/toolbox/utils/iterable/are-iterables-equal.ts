import {areIteratorsEqual} from '../iterator/are-iterators-equal';

function areIterablesEqual<T>(...iterables: Iterable<T>): boolean {
  return areIteratorsEqual(
    ...iterables.map((iterable) => iterable[Symbol.iterator]()));
}

export {areIterablesEqual};
