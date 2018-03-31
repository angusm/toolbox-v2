import {getOpacity} from '../style/get-opacity';
import {getVisibleHeight} from './get-visible-height';
import {getVisibleWidth} from './get-visible-width';

function getVisibleArea(
  target: HTMLElement, container: HTMLElement, factorInOpacity: boolean = false
): number {
  const opacityFactor: number = factorInOpacity ? getOpacity(target) : 1;
  return getVisibleWidth(target, container) *
    getVisibleHeight(target, container) * opacityFactor;
}

export {getVisibleArea};
