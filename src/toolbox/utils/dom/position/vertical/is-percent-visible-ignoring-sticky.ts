import {isDisplayed} from "../../style/is-displayed";
import {getVisibleHeightIgnoringSticky} from "./get-visible-height-ignoring-sticky";

function isPercentVisibleIgnoringSticky(
  target: HTMLElement,
  percent: number,
  container: HTMLElement = null
): boolean {
  const visibleHeight = getVisibleHeightIgnoringSticky(target, container);
  return isDisplayed(target) &&
    visibleHeight > 0 &&
    visibleHeight >= target.offsetHeight * percent;
}

export {isPercentVisibleIgnoringSticky};
