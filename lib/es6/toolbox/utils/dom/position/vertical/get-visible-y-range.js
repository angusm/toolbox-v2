import { getVisibleDistanceFromRoot } from './get-visible-distance-from-root';
import { NumericRange } from '../../../math/numeric-range';
function getVisibleYRange(element) {
    var min = getVisibleDistanceFromRoot(element);
    return new NumericRange(min, min + element.offsetHeight);
}
export { getVisibleYRange };
//# sourceMappingURL=get-visible-y-range.js.map