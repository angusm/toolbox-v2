import {isPercentVisible} from "./is-percent-visible";

function isMajorityVisible(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): boolean {
  return isPercentVisible(target, .5, container, factorInOpacity);
}

export {isMajorityVisible};
