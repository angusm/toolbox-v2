import {Range} from '../../math/range';
import {getVisibleDistanceBetweenElements} from './get-visible-distance-between-elements';
import {Vector2d} from "../../math/geometry/vector-2d";

function getVisibleWidth(
  target: HTMLElement, container: HTMLElement = null
): number {
  const distance: Vector2d =
    getVisibleDistanceBetweenElements(target, container);
  const containerWidth: number =
    container ? container.offsetWidth : window.innerWidth;
  const visibleXRange: Range = new Range(0, containerWidth);
  const startX: number = visibleXRange.clamp(distance.x);
  const endX: number = visibleXRange.clamp(distance.x + target.offsetWidth);
  return endX - startX;
}

export {getVisibleWidth};
