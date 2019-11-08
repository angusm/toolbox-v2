import {getVisibleDistanceFromRoot} from './get-visible-distance-from-root';
import {Vector2d} from '../../math/geometry/vector-2d';
import {SCROLL_ELEMENT} from "./scroll-element";

function getVisibleDistanceBetweenElements(
  a: HTMLElement, b: HTMLElement = null
): Vector2d {
  if (b !== null && b !== SCROLL_ELEMENT) {
    return getVisibleDistanceFromRoot(a)
      .subtract(getVisibleDistanceFromRoot(b));
  } else {
    return getVisibleDistanceFromRoot(a);
  }
}

export {getVisibleDistanceBetweenElements};
