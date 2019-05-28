import { getVisibleDistanceFromRootIfUnstuck } from "./get-visible-distance-from-root-if-unstuck";
function getVisibleDistanceBetweenElementsIfUnstuck(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null) {
        return getVisibleDistanceFromRootIfUnstuck(a) -
            getVisibleDistanceFromRootIfUnstuck(b);
    }
    else {
        return getVisibleDistanceFromRootIfUnstuck(a);
    }
}
export { getVisibleDistanceBetweenElementsIfUnstuck };
//# sourceMappingURL=get-visible-distance-between-elements-if-unstuck.js.map