import {getVisibleArea} from './get-visible-area';
import {isDisplayed} from "../style/is-displayed";

function isFullyVisible(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): boolean {
  return isDisplayed(target) &&
    getVisibleArea(target, container, factorInOpacity) ===
      target.offsetWidth * target.offsetHeight;
}

export {isFullyVisible};
