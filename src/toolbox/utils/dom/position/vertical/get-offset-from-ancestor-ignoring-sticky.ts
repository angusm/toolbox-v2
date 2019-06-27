import {getOffsetTopIgnoringSticky} from "./get-offset-top-ignoring-sticky";

const ignoredPositions = new Set(['fixed', 'absolute']);

function getOffsetFromAncestorIgnoringSticky(
  element: HTMLElement, ancestor: HTMLElement = null
): number {
  if (!element || element === ancestor) {
    return 0;
  } else {
    return getOffsetTopIgnoringSticky(element) +
      getOffsetFromAncestorIgnoringSticky(
        <HTMLElement>element.offsetParent, ancestor);
  }
}

export {getOffsetFromAncestorIgnoringSticky};
