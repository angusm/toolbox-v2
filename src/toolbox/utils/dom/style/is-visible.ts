import {getStyle} from "./get-style";
import {isDisplayed} from "./is-displayed";

function isVisible(element: HTMLElement): boolean {
  return isDisplayed(element) && getStyle(element, 'visibility') !== 'hidden';
}

export {isVisible};
