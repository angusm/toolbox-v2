import {getVisibleDistanceFromRoot} from './get-visible-distance-from-root';
import {Vector2d} from "../../math/geometry/vector-2d";

function getVisibleDistanceBetweenElements(
  a: HTMLElement, b: HTMLElement = null
): Vector2d {
  if (b !== null) {
    return getVisibleDistanceFromRoot(a)
      .subtract(getVisibleDistanceFromRoot(b));
  } else {
    return getVisibleDistanceFromRoot(a);
  }
}

export {getVisibleDistanceBetweenElements};
