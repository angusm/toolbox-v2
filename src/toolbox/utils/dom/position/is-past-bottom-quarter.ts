import {Dimensions2d} from "../../math/geometry/dimensions-2d";
import {getVisibleDistanceBetweenElements} from "./get-visible-distance-between-elements";

function isPastBottomQuarter(
  target: HTMLElement, container: HTMLElement = null
): boolean {
  const yDistance: number =
    getVisibleDistanceBetweenElements(target, container).y;
  const threeQuartersHeight: number =
    Dimensions2d.fromElementOffset(container).height * (3/4);

  return yDistance < threeQuartersHeight;
}

export {isPastBottomQuarter};
