import {getVisibleDistanceFromRoot} from './get-visible-distance-from-root';

function getVisibleYRange(element: HTMLElement) {
  return getVisibleDistanceFromRoot(element) + element.offsetHeight;
}

export {getVisibleYRange};
