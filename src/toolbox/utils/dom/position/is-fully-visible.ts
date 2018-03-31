import {getVisibleArea} from './get-visible-area';

function isFullyVisible(
  target: HTMLElement, container: HTMLElement, factorInOpacity: boolean = false
): boolean {
  return getVisibleArea(target, container, factorInOpacity) ===
    target.offsetWidth * target.offsetHeight;
}

export {isFullyVisible};
