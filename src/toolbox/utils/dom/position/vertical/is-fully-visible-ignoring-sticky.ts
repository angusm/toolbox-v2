import {isPercentVisibleIgnoringSticky} from "./is-percent-visible-ignoring-sticky";

function isFullyVisibleIgnoringSticky(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return isPercentVisibleIgnoringSticky(target, 1, container);
}

export {isFullyVisibleIgnoringSticky};
