import {getDistanceUntilVisible} from "./get-distance-until-visible";

function isScrolledPast(
  element: HTMLElement, container: HTMLElement = null
): boolean {
  return getDistanceUntilVisible(element, container).y < 0;
}

export {isScrolledPast};
