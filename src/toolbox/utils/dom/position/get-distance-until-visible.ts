import {Vector2d} from '../../math/geometry/vector-2d';
import {Range} from '../../math/range';
import {getVisibleDistanceBetweenElements} from "./get-visible-distance-between-elements";
import {Dimensions2d} from "../../math/geometry/dimensions-2d";
import {getAncestorDimensions} from "./get-ancestor-dimensions";

function getDistanceOnAxisUntilVisible_(
  rawDistance: number, ancestorDistance: number, elementDistance: number
): number {
  const ancestorRange = new Range(-elementDistance, ancestorDistance);
  if (ancestorRange.contains(rawDistance)) {
    return 0;
  }
  if (rawDistance > 0) {
    return rawDistance - ancestorDistance;
  } else {
    return rawDistance + elementDistance;
  }
}

function getDistanceUntilVisible(
  element: HTMLElement, ancestor: HTMLElement = null
): Vector2d {
  const ancestorDimensions = getAncestorDimensions(ancestor);
  const elementDimensions = Dimensions2d.fromElementOffset(element);
  const visibleDistance = getVisibleDistanceBetweenElements(element, ancestor);

  return new Vector2d(
    getDistanceOnAxisUntilVisible_(
      visibleDistance.x, ancestorDimensions.width, elementDimensions.width),
    getDistanceOnAxisUntilVisible_(
      visibleDistance.y, ancestorDimensions.height, elementDimensions.height));
}

export {getDistanceUntilVisible};
