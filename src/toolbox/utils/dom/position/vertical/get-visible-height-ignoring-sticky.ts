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
  const startY: number = NumericRange.clamp(distance, 0, containerHeight);
  const endY: number =
    NumericRange.clamp(distance + target.offsetHeight, 0, containerHeight);
  return endY - startY;
}

export {getVisibleHeightIgnoringSticky};
