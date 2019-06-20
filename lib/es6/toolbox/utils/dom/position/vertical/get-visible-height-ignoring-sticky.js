import { NumericRange } from '../../../math/numeric-range';
import { getAncestorHeight } from "./get-ancestor-height";
import { getVisibleDistanceBetweenElementsIgnoringSticky } from "./get-visible-distance-between-elements-ignoring-sticky";
function getVisibleHeightIgnoringSticky(target, container) {
    if (container === void 0) { container = null; }
    var distance = getVisibleDistanceBetweenElementsIgnoringSticky(target, container);
    var containerHeight = getAncestorHeight(container);
    var visibleYRange = new NumericRange(0, containerHeight);
    var startY = visibleYRange.clamp(distance);
    var endY = visibleYRange.clamp(distance + target.offsetHeight);
    return endY - startY;
}
export { getVisibleHeightIgnoringSticky };
//# sourceMappingURL=get-visible-height-ignoring-sticky.js.map