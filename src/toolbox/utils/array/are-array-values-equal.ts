import {areEqual} from '../are-equal';
import {toBool} from '../to-bool';
import {zip} from './zip';

function areArrayValuesEqual<T>(...lists: T[][]): boolean {
  if (!lists.every((list: T[]) => toBool(list))) {
    return false;
  }
  if (!areEqual(...lists.map((list: T[]) => list.length))) {
    return false;
  }
  return zip(...lists).every((zippedValues: T[]) => areEqual(...zippedValues));
}

export {areArrayValuesEqual};
