import {getVisibleWidth} from './get-visible-width';

function isVisible(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return getVisibleWidth(target, container) > 0;
}

export {isVisible};
