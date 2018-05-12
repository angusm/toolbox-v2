import { getDistanceBetweenCenters } from './get-distance-between-centers';
import { min } from '../../array/min';
function getClosestToCenter(elements, container) {
    if (container === void 0) { container = null; }
    return min(Array.from(elements), function (el) { return Math.abs(getDistanceBetweenCenters(el, container).getLength()); });
}
export { getClosestToCenter };
//# sourceMappingURL=get-closest-to-center.js.map