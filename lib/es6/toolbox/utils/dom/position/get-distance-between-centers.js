import { Dimensions2d } from '../../math/geometry/dimensions-2d';
import { frameMemoize } from '../../frame-memoize';
import { getVisibleDistanceBetweenElements } from './get-visible-distance-between-elements';
import { Vector2d } from "../../math/geometry/vector-2d";
function getDistanceBetweenCenters_(a, b) {
    var distance = getVisibleDistanceBetweenElements(a, b);
    var elementSize = Dimensions2d.fromElementOffset(a);
    var containerSize;
    if (b) {
        containerSize = Dimensions2d.fromElementOffset(b);
    }
    else {
        containerSize = new Dimensions2d(window.innerWidth, window.innerHeight);
    }
    return distance.add(Vector2d.fromVector(elementSize.subtract(containerSize)));
}
var getDistanceBetweenCenters = frameMemoize(getDistanceBetweenCenters_);
export { getDistanceBetweenCenters };
//# sourceMappingURL=get-distance-between-centers.js.map