import {getVisibleHeight} from './get-visible-height';

function isVisible(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return getVisibleHeight(target, container) > 0;
}

export {isVisible};
