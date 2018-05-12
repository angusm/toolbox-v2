import { getVisibleDistanceFromRoot } from './get-visible-distance-from-root';
import { Range } from '../../../math/range';
function getVisibleYRange(element) {
    var min = getVisibleDistanceFromRoot(element);
    return new Range(min, min + element.offsetHeight);
}
export { getVisibleYRange };
//# sourceMappingURL=get-visible-y-range.js.map