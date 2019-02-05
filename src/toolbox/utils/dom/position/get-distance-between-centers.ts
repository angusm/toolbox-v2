import {Vector2d} from "../../math/geometry/vector-2d";
import {getVisibleDistanceBetweenElementCenters} from "./get-visible-distance-between-element-centers";

function getDistanceBetweenCenters(a: HTMLElement, b: HTMLElement): Vector2d {
  console.warn('getDistanceBetweenCenters is deprecated in favor of the identical but more clearly named getVisibleDistanceBetweenElementCenters');
  return getVisibleDistanceBetweenElementCenters(a, b);
}

export {getDistanceBetweenCenters};
