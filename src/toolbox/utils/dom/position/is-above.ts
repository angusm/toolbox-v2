import {getVisibleDistanceBetweenElements} from "./get-visible-distance-between-elements";

function isAbove(a: HTMLElement, b: HTMLElement): boolean {
  return getVisibleDistanceBetweenElements(a, b).y < 0;
}

export {isAbove};
