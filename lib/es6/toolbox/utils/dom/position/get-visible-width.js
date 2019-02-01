import { NumericRange } from '../../math/numeric-range';
import { getVisibleDistanceBetweenElements } from './get-visible-distance-between-elements';
function getVisibleWidth(target, container) {
    if (container === void 0) { container = null; }
    var distance = getVisibleDistanceBetweenElements(target, container);
    var containerWidth = container ? container.offsetWidth : window.innerWidth;
    var visibleXRange = new NumericRange(0, containerWidth);
    var startX = visibleXRange.clamp(distance.x);
    var endX = visibleXRange.clamp(distance.x + target.offsetWidth);
    return endX - startX;
}
export { getVisibleWidth };
//# sourceMappingURL=get-visible-width.js.map