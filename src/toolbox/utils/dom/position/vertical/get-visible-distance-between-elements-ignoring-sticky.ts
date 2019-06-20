import {getVisibleDistanceFromRootIgnoringSticky} from "./get-visible-distance-from-root-ignoring-sticky";

function getVisibleDistanceBetweenElementsIgnoringSticky(
  a: HTMLElement, b: HTMLElement = null
): number {
  if (b !== null) {
    return getVisibleDistanceFromRootIgnoringSticky(a) -
      getVisibleDistanceFromRootIgnoringSticky(b);
  } else {
    return getVisibleDistanceFromRootIgnoringSticky(a);
  }
}

export {getVisibleDistanceBetweenElementsIgnoringSticky};
