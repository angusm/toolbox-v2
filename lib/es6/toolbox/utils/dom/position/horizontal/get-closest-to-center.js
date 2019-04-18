import { min } from '../../../array/min';
import { getVisibleDistanceBetweenElementCenters } from "./get-visible-distance-between-element-centers";
function getClosestToCenter(elements, container) {
    if (container === void 0) { container = null; }
    return min(Array.from(elements), function (el) {
        return Math.abs(getVisibleDistanceBetweenElementCenters(el, container));
    });
}
export { getClosestToCenter };
//# sourceMappingURL=get-closest-to-center.js.map