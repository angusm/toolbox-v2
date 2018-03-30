import {zip} from './zip';
import {areEqual} from '../are-equal';

function areArrayValuesEqual<T>(...lists: Array<T>[]): boolean {
  return lists.every((list) => list) &&
    areEqual(...lists.map((list) => list.length)) &&
    zip(...lists).every((zippedValues) => areEqual(...zippedValues));
}

export {areArrayValuesEqual};
