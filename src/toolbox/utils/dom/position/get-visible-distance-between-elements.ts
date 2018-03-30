import {frameMemoize} from '../../frame-memoize';
import {getVisibleDistanceFromAncestor} from './get-visible-distance-from-ancestor';
import {Vector2d} from "../../math/geometry/vector-2d";

function getVisibleDistanceBetweenElements_(
  a: HTMLElement, b: HTMLElement = null
): Vector2d {
  if (b !== null) {
    return getVisibleDistanceFromAncestor(a, null)
      .subtract(getVisibleDistanceFromAncestor(b, null));
  } else {
    return getVisibleDistanceFromAncestor(a, null);
  }
}

const getVisibleDistanceBetweenElements =
  frameMemoize(getVisibleDistanceBetweenElements_);

export {getVisibleDistanceBetweenElements};
