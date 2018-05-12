import {getVisibleArea} from './get-visible-area';
import {isDisplayed} from "../style/is-displayed";

function isFillingVisibleArea(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): boolean {
  const visibleArea = getVisibleArea(target, container, factorInOpacity);
  return isDisplayed(target) &&
    visibleArea > 0 &&
    visibleArea === window.innerWidth * window.innerHeight;
}

export {isFillingVisibleArea};
