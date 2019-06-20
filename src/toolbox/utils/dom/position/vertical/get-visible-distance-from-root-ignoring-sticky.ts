import {VisibleDistanceFromRootService} from "./visible-distance-from-root-service";

const visibleDistanceFromRootService =
  VisibleDistanceFromRootService.getSingleton();

function getVisibleDistanceFromRootIgnoringSticky(element: HTMLElement): number {
  return visibleDistanceFromRootService
    .getVisibleDistanceFromRootIgnoringSticky(element);
}

export {getVisibleDistanceFromRootIgnoringSticky};
