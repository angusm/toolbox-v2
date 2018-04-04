import {getVisibleArea} from './get-visible-area';

function isVisible(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): boolean {
  return getVisibleArea(target, container, factorInOpacity) > 0;
}

export {isVisible};
