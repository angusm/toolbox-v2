import {Dimensions2d} from "../../math/geometry/dimensions-2d";
import {Range} from "../../math/range";
import {getVisibleDistanceBetweenElementBottoms} from "./get-visible-distance-between-element-bottoms";

function isBottomVisible(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  const acceptableRange: Range =
    new Range(0, -Dimensions2d.fromElementOffset(container).height);
  return acceptableRange
    .contains(getVisibleDistanceBetweenElementBottoms(target, container))
}

export {isBottomVisible};
