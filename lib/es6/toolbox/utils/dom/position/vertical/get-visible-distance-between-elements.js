import { getVisibleDistanceFromRoot } from './get-visible-distance-from-root';
function getVisibleDistanceBetweenElements(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null) {
        return getVisibleDistanceFromRoot(a)
            .subtract(getVisibleDistanceFromRoot(b));
    }
    else {
        return getVisibleDistanceFromRoot(a);
    }
}
export { getVisibleDistanceBetweenElements };
//# sourceMappingURL=get-visible-distance-between-elements.js.map