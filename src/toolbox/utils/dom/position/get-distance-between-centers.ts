import {Dimensions2d} from '../../math/geometry/dimensions-2d';
import {frameMemoize} from '../../frame-memoize';
import {getVisibleDistanceBetweenElements} from './get-visible-distance-between-elements';
import {Vector2d} from "../../math/geometry/vector-2d";
import {getAncestorDimensions} from "./get-ancestor-dimensions";

function getDistanceBetweenCenters_(a: HTMLElement, b: HTMLElement): Vector2d {
  const distance: Vector2d = getVisibleDistanceBetweenElements(a, b);
  const elementSize: Dimensions2d = Dimensions2d.fromElementOffset(a);
  let containerSize: Dimensions2d = getAncestorDimensions(b);
  return distance.add(Vector2d.fromVector(elementSize.subtract(containerSize)));
}

const getDistanceBetweenCenters = frameMemoize(getDistanceBetweenCenters_);

export {getDistanceBetweenCenters};
