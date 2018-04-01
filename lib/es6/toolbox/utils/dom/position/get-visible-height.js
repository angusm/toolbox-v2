import { Range } from '../../math/range';
import { getVisibleDistanceBetweenElements } from './get-visible-distance-between-elements';
function getVisibleHeight(target, container) {
    if (container === void 0) { container = null; }
    var distance = getVisibleDistanceBetweenElements(target, container);
    var containerHeight = container ? container.offsetHeight : window.innerHeight;
    var visibleYRange = new Range(0, containerHeight);
    var startY = visibleYRange.clamp(distance.y);
    var endY = visibleYRange.clamp(distance.y + target.offsetHeight);
    return endY - startY;
}
export { getVisibleHeight };
//# sourceMappingURL=get-visible-height.js.map