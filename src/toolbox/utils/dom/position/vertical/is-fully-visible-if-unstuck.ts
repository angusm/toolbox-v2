import {isPercentVisibleIfUnstuck} from "./is-percent-visible-if-unstuck";

function isFullyVisibleIfUnstuck(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return isPercentVisibleIfUnstuck(target, 1, container);
}

export {isFullyVisibleIfUnstuck};
