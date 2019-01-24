import {Dimensions2d} from "../../math/geometry/dimensions-2d";
import {NumericRange} from "../../math/numeric-range";
import {getVisibleDistanceBetweenElementBottoms} from "./vertical/get-visible-distance-between-element-bottoms";
import {isVisible} from "./is-visible";

function isBottomVisible(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): boolean {
  const acceptableRange: NumericRange =
    new NumericRange(-Dimensions2d.fromElementOffset(container).height, 0);
  return isVisible(target, container, factorInOpacity) &&
    acceptableRange
      .contains(getVisibleDistanceBetweenElementBottoms(target, container));
}

export {isBottomVisible};
