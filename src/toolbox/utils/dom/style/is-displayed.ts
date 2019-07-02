import {getStyle} from "./get-style";

function isDisplayed(element: Element): boolean {
  return getStyle(element, 'display') !== 'none';
}

export {isDisplayed};
