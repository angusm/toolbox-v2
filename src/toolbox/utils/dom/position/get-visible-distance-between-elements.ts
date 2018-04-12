import {frameMemoize} from '../../frame-memoize';
import {getVisibleDistanceFromRoot} from './get-visible-distance-from-root';
import {Vector2d} from "../../math/geometry/vector-2d";

function getVisibleDistanceBetweenElements_(
  a: HTMLElement, b: HTMLElement = null
): Vector2d {
  if (b !== null) {
    return getVisibleDistanceFromRoot(a)
      .subtract(getVisibleDistanceFromRoot(b));
  } else {
    return getVisibleDistanceFromRoot(a);
  }
}

const getVisibleDistanceBetweenElements =
  frameMemoize(getVisibleDistanceBetweenElements_);

export {getVisibleDistanceBetweenElements};
