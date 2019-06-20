import {NumericRange} from '../../../math/numeric-range';
import {getAncestorHeight} from "./get-ancestor-height";
import {getVisibleDistanceBetweenElementsIgnoringSticky} from "./get-visible-distance-between-elements-ignoring-sticky";

function getVisibleHeightIgnoringSticky(
  target: HTMLElement,
  container: HTMLElement = null
): number {
  const distance: number =
    getVisibleDistanceBetweenElementsIgnoringSticky(target, container);
  const containerHeight: number = getAncestorHeight(container);
  const visibleYRange: NumericRange = new NumericRange(0, containerHeight);
  const startY: number = visibleYRange.clamp(distance);
  const endY: number = visibleYRange.clamp(distance + target.offsetHeight);
  return endY - startY;
}

export {getVisibleHeightIgnoringSticky};
