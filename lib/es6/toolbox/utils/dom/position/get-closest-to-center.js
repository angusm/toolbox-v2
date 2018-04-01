import { getDistanceBetweenCenters } from './get-distance-between-centers';
import { min } from '../../array/min';
import { frameMemoize } from "../../frame-memoize";
function getClosestToCenter_(elements, container) {
    if (container === void 0) { container = null; }
    return min(Array.from(elements), function (el) { return Math.abs(getDistanceBetweenCenters(el, container).getLength()); });
}
var getClosestToCenter = frameMemoize(getClosestToCenter_);
export { getClosestToCenter };
//# sourceMappingURL=get-closest-to-center.js.map