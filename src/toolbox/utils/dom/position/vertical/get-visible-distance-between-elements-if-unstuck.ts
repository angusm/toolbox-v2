import {getVisibleDistanceFromRootIfUnstuck} from "./get-visible-distance-from-root-if-unstuck";

function getVisibleDistanceBetweenElementsIfUnstuck(
  a: HTMLElement, b: HTMLElement = null
): number {
  if (b !== null) {
    return getVisibleDistanceFromRootIfUnstuck(a) -
      getVisibleDistanceFromRootIfUnstuck(b);
  } else {
    return getVisibleDistanceFromRootIfUnstuck(a);
  }
}

export {getVisibleDistanceBetweenElementsIfUnstuck};
