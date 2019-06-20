import {getVisibleHeightIgnoringSticky} from './get-visible-height-ignoring-sticky';

function isVisibleIgnoringSticky(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return getVisibleHeightIgnoringSticky(target, container) > 0;
}

export {isVisibleIgnoringSticky};
