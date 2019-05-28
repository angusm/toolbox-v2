import {isDisplayed} from '../../style/is-displayed';
import {SCROLL_ELEMENT} from '../scroll-element';
import {getVisibleHeight} from "./get-visible-height";

function isFillingVisibleHeight(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return isDisplayed(target) &&
    getVisibleHeight(target, container) === SCROLL_ELEMENT.clientHeight;
}

export {isFillingVisibleHeight};
