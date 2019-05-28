import { getStuckDistance } from "./get-stuck-distance";
import { getVisibleDistanceFromRoot } from "./get-visible-distance-from-root";
function getVisibleDistanceFromRootIfUnstuck(element) {
    return getVisibleDistanceFromRoot(element) - getStuckDistance(element);
}
export { getVisibleDistanceFromRootIfUnstuck };
//# sourceMappingURL=get-visible-distance-from-root-if-unstuck.js.map