import {isDisplayed} from "../../style/is-displayed";
import {getVisibleHeightIfUnstuck} from "./get-visible-height-if-unstuck";

function isPercentVisibleIfUnstuck(
  target: HTMLElement,
  percent: number,
  container: HTMLElement = null
): boolean {
  const visibleHeight = getVisibleHeightIfUnstuck(target, container);
  return isDisplayed(target) &&
    visibleHeight > 0 &&
    visibleHeight >= target.offsetHeight * percent;
}

export {isPercentVisibleIfUnstuck};
