import { NumericRange } from '../../../math/numeric-range';
import { getAncestorHeight } from "./get-ancestor-height";
import { getVisibleDistanceBetweenElementsIfUnstuck } from "./get-visible-distance-between-elements-if-unstuck";
function getVisibleHeightIfUnstuck(target, container) {
    if (container === void 0) { container = null; }
    var distance = getVisibleDistanceBetweenElementsIfUnstuck(target, container);
    var containerHeight = getAncestorHeight(container);
    var visibleYRange = new NumericRange(0, containerHeight);
    var startY = visibleYRange.clamp(distance);
    var endY = visibleYRange.clamp(distance + target.offsetHeight);
    return endY - startY;
}
export { getVisibleHeightIfUnstuck };
//# sourceMappingURL=get-visible-height-if-unstuck.js.map