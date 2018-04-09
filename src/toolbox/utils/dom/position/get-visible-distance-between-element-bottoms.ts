import {getVisibleDistanceBetweenElements} from "./get-visible-distance-between-elements";
import {Dimensions2d} from "../../math/geometry/dimensions-2d";

function getVisibleDistanceBetweenElementBottoms(
  target: HTMLElement,
  container: HTMLElement = null
): number {
  return getVisibleDistanceBetweenElements(target, container).y +
    Dimensions2d.fromElementOffset(target).height -
    Dimensions2d.fromElementOffset(container).height;
}

export {getVisibleDistanceBetweenElementBottoms};
