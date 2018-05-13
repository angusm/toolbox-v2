import {isFullyVisible} from "./is-fully-visible";
import {isFillingVisibleArea} from "./is-filling-visible-area";

function isElementDominant(element: HTMLElement): boolean {
  return isFullyVisible(element) || isFillingVisibleArea(element);
}

export {isElementDominant};
