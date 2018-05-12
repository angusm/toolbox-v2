import {getVisibleYPosition} from './get-visible-y-position';

function getVisibleCenterYPosition(element: HTMLElement) {
  return getVisibleYPosition(element) + element.offsetHeight / 2;
}

export {getVisibleCenterYPosition};
