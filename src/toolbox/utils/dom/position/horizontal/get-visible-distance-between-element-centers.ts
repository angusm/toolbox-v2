import {getVisibleDistanceBetweenElements} from "./get-visible-distance-between-elements";

function getVisibleDistanceBetweenElementCenters(
  target: HTMLElement,
  container: HTMLElement = null
): number {
  return getVisibleDistanceBetweenElements(target, container) +
    (target.offsetWidth / 2) -
    (container !== null ? container.offsetWidth : window.innerWidth) / 2;
}

export {getVisibleDistanceBetweenElementCenters};
