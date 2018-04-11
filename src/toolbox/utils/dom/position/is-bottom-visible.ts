import {Dimensions2d} from "../../math/geometry/dimensions-2d";
import {Range} from "../../math/range";
import {getVisibleDistanceBetweenElementBottoms} from "./get-visible-distance-between-element-bottoms";
import {isVisible} from "./is-visible";

function isBottomVisible(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): boolean {
  const acceptableRange: Range =
    new Range(0, -Dimensions2d.fromElementOffset(container).height);
  return isVisible(target, container, factorInOpacity) &&
    acceptableRange
      .contains(getVisibleDistanceBetweenElementBottoms(target, container));
}

export {isBottomVisible};
