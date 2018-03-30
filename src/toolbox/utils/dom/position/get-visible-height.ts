import {Range} from '../../range';
import {getVisibleDistanceBetweenElements} from './get-visible-distance-between-elements';
import {Vector2d} from "../../math/geometry/vector-2d";

function getVisibleHeight(
  target: HTMLElement, container: HTMLElement = null
): number {
  const distance: Vector2d =
    getVisibleDistanceBetweenElements(target, container);
  const containerHeight: number =
    container ? container.offsetHeight : window.innerHeight;
  const visibleYRange: Range = new Range(0, containerHeight);
  const startY: number = visibleYRange.clamp(distance.y);
  const endY: number = visibleYRange.clamp(distance.y + target.offsetHeight);
  return endY - startY;
}

export {getVisibleHeight};
