import {getVisibleArea} from './get-visible-area';
import {isDisplayed} from "../style/is-displayed";

function isPercentVisible(
  target: HTMLElement,
  percent: number,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): boolean {
  const visibleArea = getVisibleArea(target, container, factorInOpacity);
  return isDisplayed(target) &&
    visibleArea > 0 &&
    visibleArea >= target.offsetWidth * target.offsetHeight * percent;
}

export {isPercentVisible};
