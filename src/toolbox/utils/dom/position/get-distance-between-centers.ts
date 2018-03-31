import {Dimensions2d} from '../../math/geometry/dimensions-2d';
import {frameMemoize} from '../../frame-memoize';
import {getVisibleDistanceBetweenElements} from './get-visible-distance-between-elements';
import {Vector2d} from "../../math/geometry/vector-2d";
import {Vector} from "../../math/geometry/vector";

function getDistanceBetweenCenters_(a: HTMLElement, b: HTMLElement): Vector2d {
  const distance: Vector2d = getVisibleDistanceBetweenElements(a, b);
  const elementSize: Dimensions2d = Dimensions2d.fromElementOffset(a);
  let containerSize: Dimensions2d;
  if (b) {
    containerSize = Dimensions2d.fromElementOffset(b);
  } else {
    containerSize = new Dimensions2d(window.innerWidth, window.innerHeight);
  }
  return distance.add(Vector2d.fromVector(elementSize.subtract(containerSize)));
}

const getDistanceBetweenCenters = frameMemoize(getDistanceBetweenCenters_);

export {getDistanceBetweenCenters};
