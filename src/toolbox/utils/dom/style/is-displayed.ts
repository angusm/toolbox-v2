import {getStyle} from "./get-style";

function isDisplayed(element: HTMLElement): boolean {
  return getStyle(element, 'display') !== 'none';
}

export {isDisplayed};
