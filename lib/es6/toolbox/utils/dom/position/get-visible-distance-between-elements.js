import { frameMemoize } from '../../frame-memoize';
import { getVisibleDistanceFromRoot } from './get-visible-distance-from-root';
function getVisibleDistanceBetweenElements_(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null) {
        return getVisibleDistanceFromRoot(a)
            .subtract(getVisibleDistanceFromRoot(b));
    }
    else {
        return getVisibleDistanceFromRoot(a);
    }
}
var getVisibleDistanceBetweenElements = frameMemoize(getVisibleDistanceBetweenElements_);
export { getVisibleDistanceBetweenElements };
//# sourceMappingURL=get-visible-distance-between-elements.js.map