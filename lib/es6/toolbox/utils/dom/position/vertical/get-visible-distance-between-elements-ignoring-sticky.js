import { getVisibleDistanceFromRootIgnoringSticky } from "./get-visible-distance-from-root-ignoring-sticky";
function getVisibleDistanceBetweenElementsIgnoringSticky(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null) {
        return getVisibleDistanceFromRootIgnoringSticky(a) -
            getVisibleDistanceFromRootIgnoringSticky(b);
    }
    else {
        return getVisibleDistanceFromRootIgnoringSticky(a);
    }
}
export { getVisibleDistanceBetweenElementsIgnoringSticky };
//# sourceMappingURL=get-visible-distance-between-elements-ignoring-sticky.js.map