import {getVisibleDistanceFromRoot} from './get-visible-distance-from-root';
import {Range} from '../../../math/range';

function getVisibleYRange(element: HTMLElement) {
  const min = getVisibleDistanceFromRoot(element);
  return new Range(min, min + element.offsetHeight);
}

export {getVisibleYRange};
