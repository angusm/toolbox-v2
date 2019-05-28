import {NumericRange} from '../../../math/numeric-range';
import {getAncestorHeight} from "./get-ancestor-height";
import {getVisibleDistanceBetweenElementsIfUnstuck} from "./get-visible-distance-between-elements-if-unstuck";

function getVisibleHeightIfUnstuck(
  target: HTMLElement,
  container: HTMLElement = null
): number {
  const distance: number =
    getVisibleDistanceBetweenElementsIfUnstuck(target, container);
  const containerHeight: number = getAncestorHeight(container);
  const visibleYRange: NumericRange = new NumericRange(0, containerHeight);
  const startY: number = visibleYRange.clamp(distance);
  const endY: number = visibleYRange.clamp(distance + target.offsetHeight);
  return endY - startY;
}

export {getVisibleHeightIfUnstuck};
