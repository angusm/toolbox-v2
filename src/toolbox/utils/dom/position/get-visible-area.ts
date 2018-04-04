import {getOpacity} from '../style/get-opacity';
import {getVisibleHeight} from './get-visible-height';
import {getVisibleWidth} from './get-visible-width';
import {isDisplayed} from "../style/is-displayed";

function getVisibleArea(
  target: HTMLElement,
  container: HTMLElement = null,
  factorInOpacity: boolean = false
): number {
  if (!isDisplayed(target)) {
    return 0;
  }

  const opacityFactor: number = factorInOpacity ? getOpacity(target) : 1;
  return getVisibleWidth(target, container) *
    getVisibleHeight(target, container) * opacityFactor;
}

export {getVisibleArea};
