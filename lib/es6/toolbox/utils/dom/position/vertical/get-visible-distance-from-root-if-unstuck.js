import { getStuckDistance } from "./get-stuck-distance";
function getVisibleDistanceFromRootIfUnstuck(element) {
    return getVisibleDistanceFromRootIfUnstuck(element) -
        getStuckDistance(element);
}
export { getVisibleDistanceFromRootIfUnstuck };
//# sourceMappingURL=get-visible-distance-from-root-if-unstuck.js.map