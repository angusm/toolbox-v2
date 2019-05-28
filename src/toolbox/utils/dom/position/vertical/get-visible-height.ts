import {NumericRange} from '../../../math/numeric-range';
import {getVisibleDistanceBetweenElements} from './get-visible-distance-between-elements';
import {getAncestorHeight} from "./get-ancestor-height";

function getVisibleHeight(
  target: HTMLElement,
  container: HTMLElement = null
): number {
  const distance: number =
    getVisibleDistanceBetweenElements(target, container);
  const containerHeight: number = getAncestorHeight(container);
  const visibleYRange: NumericRange = new NumericRange(0, containerHeight);
  const startY: number = visibleYRange.clamp(distance);
  const endY: number = visibleYRange.clamp(distance + target.offsetHeight);
  return endY - startY;
}

export {getVisibleHeight};
