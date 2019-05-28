import {getVisibleHeight} from './get-visible-height';
import {isDisplayed} from "../../style/is-displayed";

function isPercentVisible(
  target: HTMLElement,
  percent: number,
  container: HTMLElement = null
): boolean {
  const visibleHeight = getVisibleHeight(target, container);
  return isDisplayed(target) &&
    visibleHeight > 0 &&
    visibleHeight >= target.offsetHeight * percent;
}

export {isPercentVisible};
