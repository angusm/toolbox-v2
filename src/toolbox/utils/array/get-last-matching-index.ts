import {areEqual} from '../are-equal';
import {zip} from './zip';

function getLastMatchingIndex<T>(...lists: T[][]): number {
  const zippedValues: T[][] = zip<T>(...lists);
  let matchIndex: number;
  for (matchIndex = 0; matchIndex < zippedValues.length; matchIndex++) {
    if (!areEqual(...zippedValues[matchIndex])) {
      return matchIndex - 1;
    }
  }
  return matchIndex - 1;
}

export {getLastMatchingIndex};
