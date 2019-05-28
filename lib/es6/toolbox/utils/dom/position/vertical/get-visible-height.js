import { NumericRange } from '../../../math/numeric-range';
import { getVisibleDistanceBetweenElements } from './get-visible-distance-between-elements';
import { getAncestorHeight } from "./get-ancestor-height";
function getVisibleHeight(target, container) {
    if (container === void 0) { container = null; }
    var distance = getVisibleDistanceBetweenElements(target, container);
    var containerHeight = getAncestorHeight(container);
    var visibleYRange = new NumericRange(0, containerHeight);
    var startY = visibleYRange.clamp(distance);
    var endY = visibleYRange.clamp(distance + target.offsetHeight);
    return endY - startY;
}
export { getVisibleHeight };
//# sourceMappingURL=get-visible-height.js.map