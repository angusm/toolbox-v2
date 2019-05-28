import {NumericRange} from '../../../math/numeric-range';
import {getVisibleDistanceBetweenElements} from './get-visible-distance-between-elements';
import {SCROLL_ELEMENT} from "../scroll-element";

function getVisibleWidth(
  target: HTMLElement, container: HTMLElement = null
): number {
  const distance: number = getVisibleDistanceBetweenElements(target, container);
  const containerWidth: number =
    container ? container.offsetWidth : SCROLL_ELEMENT.clientWidth;
  const visibleXRange: NumericRange = new NumericRange(0, containerWidth);
  const startX: number = visibleXRange.clamp(distance);
  const endX: number = visibleXRange.clamp(distance + target.offsetWidth);
  return endX - startX;
}

export {getVisibleWidth};
