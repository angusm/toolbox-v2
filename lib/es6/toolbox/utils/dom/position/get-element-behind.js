import { frameMemoize } from '../../frame-memoize';
import { min } from "../../array/min";
import { getDistanceBetweenCenters } from "./get-distance-between-centers";
function getElementBehind_(targetElement, candidateElements) {
    return min(candidateElements, function (candidateElement) {
        return getDistanceBetweenCenters(targetElement, candidateElement).getLength();
    });
}
var getElementBehind = frameMemoize(getElementBehind_);
export { getElementBehind };
//# sourceMappingURL=get-element-behind.js.map