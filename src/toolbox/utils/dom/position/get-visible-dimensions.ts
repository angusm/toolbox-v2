import {Dimensions2d} from '../../math/geometry/dimensions-2d';
import {getVisibleHeight} from './vertical/get-visible-height';
import {getVisibleWidth} from './horizontal/get-visible-width';

function getVisibleDimensions(
  target: HTMLElement, container: HTMLElement = null
): Dimensions2d {
  return new Dimensions2d(
    getVisibleWidth(target, container), getVisibleHeight(target, container));
}

export {getVisibleDimensions};
