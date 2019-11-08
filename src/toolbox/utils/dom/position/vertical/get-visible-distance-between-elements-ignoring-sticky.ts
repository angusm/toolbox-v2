import {getVisibleDistanceFromRootIgnoringSticky} from "./get-visible-distance-from-root-ignoring-sticky";
import {SCROLL_ELEMENT} from "../scroll-element";

function getVisibleDistanceBetweenElementsIgnoringSticky(
  a: HTMLElement, b: HTMLElement = null
): number {
  if (b !== null && b !== SCROLL_ELEMENT) {
    return getVisibleDistanceFromRootIgnoringSticky(a) -
      getVisibleDistanceFromRootIgnoringSticky(b);
  } else {
    return getVisibleDistanceFromRootIgnoringSticky(a);
  }
}

export {getVisibleDistanceBetweenElementsIgnoringSticky};
