import { NumericRange } from '../../../math/numeric-range';
import { getVisibleDistanceBetweenElements } from './get-visible-distance-between-elements';
import { SCROLL_ELEMENT } from "../scroll-element";
function getVisibleWidth(target, container) {
    if (container === void 0) { container = null; }
    var distance = getVisibleDistanceBetweenElements(target, container);
    var containerWidth = container ? container.offsetWidth : SCROLL_ELEMENT.clientWidth;
    var visibleXRange = new NumericRange(0, containerWidth);
    var startX = visibleXRange.clamp(distance);
    var endX = visibleXRange.clamp(distance + target.offsetWidth);
    return endX - startX;
}
export { getVisibleWidth };
//# sourceMappingURL=get-visible-width.js.map