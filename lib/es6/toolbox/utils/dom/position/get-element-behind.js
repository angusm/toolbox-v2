import { frameMemoize } from '../../frame-memoize';
import { min } from "../../array/min";
import { getDistanceBetweenCenters } from "./get-distance-between-centers";
import { Dimensions2d } from "../../math/geometry/dimensions-2d";
function getElementBehind_(target, candidates) {
    var candidatesBehindElement = candidates.filter(function (candidate) {
        var dimensions = Dimensions2d.fromElementOffset(candidate);
        var distance = getDistanceBetweenCenters(target, candidate);
        return distance.x <= dimensions.width / 2 &&
            distance.y <= dimensions.height / 2;
    });
    return min(candidatesBehindElement, function (candidate) { return getDistanceBetweenCenters(target, candidate).getLength(); });
}
var getElementBehind = frameMemoize(getElementBehind_);
export { getElementBehind };
//# sourceMappingURL=get-element-behind.js.map