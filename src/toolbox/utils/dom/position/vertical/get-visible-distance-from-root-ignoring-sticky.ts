import {VisibleDistanceFromRootService} from "./visible-distance-from-root-service";

function getVisibleDistanceFromRootIgnoringSticky(element: HTMLElement): number {
  return VisibleDistanceFromRootService.getSingleton()
    .getVisibleDistanceFromRootIgnoringSticky(element);
}

export {getVisibleDistanceFromRootIgnoringSticky};
