import {getVisibleHeightIfUnstuck} from './get-visible-height-if-unstuck';

function isVisibleIfUnstuck(
  target: HTMLElement,
  container: HTMLElement = null
): boolean {
  return getVisibleHeightIfUnstuck(target, container) > 0;
}

export {isVisibleIfUnstuck};
