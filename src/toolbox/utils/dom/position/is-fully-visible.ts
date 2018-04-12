import {getVisibleArea} from './get-visible-area';
import {isDisplayed} from "../style/is-displayed";

function isFullyVisible(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): boolean {
  const visibleArea = getVisibleArea(target, container, factorInOpacity);
  return isDisplayed(target) &&
    visibleArea > 0 &&
    visibleArea === target.offsetWidth * target.offsetHeight;
}

export {isFullyVisible};
