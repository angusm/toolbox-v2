import {getStuckDistance} from "./get-stuck-distance";

function getVisibleDistanceFromRootIfUnstuck(element: HTMLElement): number {
  return getVisibleDistanceFromRootIfUnstuck(element) -
    getStuckDistance(element);
}

export {getVisibleDistanceFromRootIfUnstuck};
