import {getVisibleDistanceBetweenElements} from "./get-visible-distance-between-elements";
import {SCROLL_ELEMENT} from "../scroll-element";

function getVisibleDistanceBetweenElementCenters(
  target: HTMLElement,
  container: HTMLElement = null
): number {
  const containerHeight =
    container !== null ?
      container.offsetHeight :
      SCROLL_ELEMENT.clientHeight;

  return getVisibleDistanceBetweenElements(target, container) +
    (target.offsetHeight / 2) - (containerHeight / 2);
}

export {getVisibleDistanceBetweenElementCenters};
