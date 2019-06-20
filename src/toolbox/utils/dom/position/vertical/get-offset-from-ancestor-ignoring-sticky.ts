import {getOffsetFromAncestor} from "./get-offset-from-ancestor";
import {getStuckDistance} from "./get-stuck-distance";

function getOffsetFromAncestorIgnoringSticky(
  element: HTMLElement, ancestor: HTMLElement = null
): number {
  if (!element || element === ancestor) {
    return 0;
  } else {
    return element.offsetTop +
      getOffsetFromAncestorIgnoringSticky(
        <HTMLElement>element.offsetParent, ancestor) -
      getStuckDistance(element);
  }
}

export {getOffsetFromAncestorIgnoringSticky};
