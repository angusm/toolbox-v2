import {getVisibleArea} from './get-visible-area';
import {isDisplayed} from "../style/is-displayed";
import {SCROLL_ELEMENT} from "./scroll-element";

function isFillingVisibleArea(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): boolean {
  const visibleArea = getVisibleArea(target, container, factorInOpacity);
  return isDisplayed(target) &&
    visibleArea > 0 &&
    visibleArea === SCROLL_ELEMENT.clientWidth * SCROLL_ELEMENT.clientHeight;
}

export {isFillingVisibleArea};
