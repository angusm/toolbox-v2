import { NumericRange } from '../../math/numeric-range';
import { getVisibleDistanceBetweenElements } from './get-visible-distance-between-elements';
import { getAncestorDimensions } from "./get-ancestor-dimensions";
function getVisibleHeight(target, container) {
    if (container === void 0) { container = null; }
    var distance = getVisibleDistanceBetweenElements(target, container);
    var containerHeight = getAncestorDimensions(container).height;
    var visibleYRange = new NumericRange(0, containerHeight);
    var startY = visibleYRange.clamp(distance.y);
    var endY = visibleYRange.clamp(distance.y + target.offsetHeight);
    return endY - startY;
}
export { getVisibleHeight };
//# sourceMappingURL=get-visible-height.js.map