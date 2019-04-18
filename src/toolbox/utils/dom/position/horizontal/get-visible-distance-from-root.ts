import {VisibleDistanceFromRootService} from "./visible-distance-from-root-service";

const visibleDistanceFromRootService =
  VisibleDistanceFromRootService.getSingleton();

function getVisibleDistanceFromRoot(element: HTMLElement): number {
  return visibleDistanceFromRootService.getVisibleDistanceFromRoot(element);
}

export {getVisibleDistanceFromRoot};
