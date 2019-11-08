import {getVisibleDistanceFromRoot} from './get-visible-distance-from-root';
import {SCROLL_ELEMENT} from "../scroll-element";

function getVisibleDistanceBetweenElements(
  a: HTMLElement, b: HTMLElement = null
): number {
  if (b !== null && b !== SCROLL_ELEMENT) {
    return getVisibleDistanceFromRoot(a) - getVisibleDistanceFromRoot(b);
  } else {
    return getVisibleDistanceFromRoot(a);
  }
}

export {getVisibleDistanceBetweenElements};
