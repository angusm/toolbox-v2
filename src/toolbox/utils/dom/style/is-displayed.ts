import {getStyle} from "./get-style";

function isDisplayed(element: Element, checkParents = false): boolean {
  if (!checkParents) {
    return getStyle(element, 'display') !== 'none';
  } else {
    return isDisplayed(element) &&
      (!element.parentElement || isDisplayed(element.parentElement, true));
  }
}

export {isDisplayed};
