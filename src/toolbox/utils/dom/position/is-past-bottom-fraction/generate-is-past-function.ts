import {Dimensions2d} from "../../../math/geometry/dimensions-2d";
import {getVisibleDistanceBetweenElements} from "../get-visible-distance-between-elements";

function generateIsPastFunction(fraction: number) {
  return function (
    target: HTMLElement, container: HTMLElement = null
  ): boolean {
    const yDistance: number =
      getVisibleDistanceBetweenElements(target, container).y;
    const threeQuartersHeight: number =
      Dimensions2d.fromElementOffset(container).height * (1 - fraction);

    return yDistance < threeQuartersHeight;
  }
}

export {generateIsPastFunction};
