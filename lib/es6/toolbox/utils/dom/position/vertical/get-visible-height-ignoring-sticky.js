import { NumericRange } from '../../../math/numeric-range';
import { getAncestorHeight } from "./get-ancestor-height";
import { getVisibleDistanceBetweenElementsIgnoringSticky } from "./get-visible-distance-between-elements-ignoring-sticky";
function getVisibleHeightIgnoringSticky(target, container) {
    if (container === void 0) { container = null; }
    var distance = getVisibleDistanceBetweenElementsIgnoringSticky(target, container);
    var containerHeight = getAncestorHeight(container);
    var startY = NumericRange.clamp(distance, 0, containerHeight);
    var endY = NumericRange.clamp(distance + target.offsetHeight, 0, containerHeight);
    return endY - startY;
}
export { getVisibleHeightIgnoringSticky };
//# sourceMappingURL=get-visible-height-ignoring-sticky.js.map