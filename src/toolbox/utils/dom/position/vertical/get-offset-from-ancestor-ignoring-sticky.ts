import {getOffsetTopIgnoringSticky} from "./get-offset-top-ignoring-sticky";
import {getStyle} from "../../style/get-style";

const ignoredPositions = new Set(['fixed', 'absolute', 'relative']);

function getOffsetFromAncestorIgnoringSticky(
  element: HTMLElement, ancestor: HTMLElement = null
): number {
  if (!element || element === ancestor) {
    return 0;
  } else if (ignoredPositions.has(getStyle(element, 'position'))) {
    return getOffsetTopIgnoringSticky(element) +
      getOffsetFromAncestorIgnoringSticky(
        <HTMLElement>element.offsetParent, ancestor);
  } else {
    return getOffsetTopIgnoringSticky(element) +
      getOffsetFromAncestorIgnoringSticky(
        <HTMLElement>element.parentElement, ancestor);
  }
}

export {getOffsetFromAncestorIgnoringSticky};
