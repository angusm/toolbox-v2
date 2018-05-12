import {getVisibleDistanceFromRoot} from './get-visible-distance-from-root';

function getVisibleDistanceBetweenElements(
  a: HTMLElement, b: HTMLElement = null
): number {
  if (b !== null) {
    return getVisibleDistanceFromRoot(a)
      .subtract(getVisibleDistanceFromRoot(b));
  } else {
    return getVisibleDistanceFromRoot(a);
  }
}

export {getVisibleDistanceBetweenElements};
