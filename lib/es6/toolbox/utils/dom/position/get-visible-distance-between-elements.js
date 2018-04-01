import { frameMemoize } from '../../frame-memoize';
import { getVisibleDistanceFromAncestor } from './get-visible-distance-from-ancestor';
function getVisibleDistanceBetweenElements_(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null) {
        return getVisibleDistanceFromAncestor(a, null)
            .subtract(getVisibleDistanceFromAncestor(b, null));
    }
    else {
        return getVisibleDistanceFromAncestor(a, null);
    }
}
var getVisibleDistanceBetweenElements = frameMemoize(getVisibleDistanceBetweenElements_);
export { getVisibleDistanceBetweenElements };
//# sourceMappingURL=get-visible-distance-between-elements.js.map