import {areEqual} from '../are-equal';

function areIteratorsEqual<T>(...iterators: Iterator<T>[]): boolean {
  let done: boolean = false;

  while (!done) {
    const results = iterators.map((iterator) => iterator.next());
    const doneResults = results.map((result) => result.done);
    if (!areEqual(...doneResults)) {
      return false;
    }

    const values = results.map((result) => result.value);
    if (!areEqual(...values)) {
      return false;
    }
  }

  return true;
}

export {areIteratorsEqual};
