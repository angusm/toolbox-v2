import { getAsList } from "../../object/get-as-list";
import { getDistanceBetweenCenters } from './get-distance-between-centers';
import { min } from '../../array/min';
function getClosestToCenter(elements, container) {
    if (container === void 0) { container = null; }
    return min(getAsList(elements), function (el) { return Math.abs(getDistanceBetweenCenters(el, container).getLength()); });
}
export { getClosestToCenter };
//# sourceMappingURL=get-closest-to-center.js.map