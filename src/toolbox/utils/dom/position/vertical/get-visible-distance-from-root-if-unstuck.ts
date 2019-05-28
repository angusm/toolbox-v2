import {getStuckDistance} from "./get-stuck-distance";
import {getVisibleDistanceFromRoot} from "./get-visible-distance-from-root";

function getVisibleDistanceFromRootIfUnstuck(element: HTMLElement): number {
  return getVisibleDistanceFromRoot(element) - getStuckDistance(element);
}

export {getVisibleDistanceFromRootIfUnstuck};
