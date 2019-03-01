import {isPercentVisible} from "./is-percent-visible";

function isFullyVisible(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): boolean {
  return isPercentVisible(target, 1, container, factorInOpacity);
}

export {isFullyVisible};
