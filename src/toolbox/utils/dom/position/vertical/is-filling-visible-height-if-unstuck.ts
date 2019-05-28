import {isDisplayed} from '../../style/is-displayed';
import {SCROLL_ELEMENT} from '../scroll-element';
import {getVisibleHeightIfUnstuck} from "./get-visible-height-if-unstuck";

function isFillingVisibleHeightIfUnstuck(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return isDisplayed(target) && (
    getVisibleHeightIfUnstuck(target, container) ===
    SCROLL_ELEMENT.clientHeight);
}

export {isFillingVisibleHeightIfUnstuck};
