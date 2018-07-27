import {getVisibleDistanceBetweenElements} from "./get-visible-distance-between-elements";
import {Dimensions2d} from "../../../math/geometry/dimensions-2d";

function getVisibleDistanceBetweenElementCenters(
  target: HTMLElement,
  container: HTMLElement = null
): number {
  return getVisibleDistanceBetweenElements(target, container) +
    Dimensions2d.fromElementOffset(target).height / 2 -
    Dimensions2d.fromElementOffset(container).height / 2;
}

export {getVisibleDistanceBetweenElementCenters};
