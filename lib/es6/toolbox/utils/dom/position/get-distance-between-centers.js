import { Dimensions2d } from '../../math/geometry/dimensions-2d';
import { getVisibleDistanceBetweenElements } from './get-visible-distance-between-elements';
import { Vector2d } from "../../math/geometry/vector-2d";
import { getAncestorDimensions } from "./get-ancestor-dimensions";
function getDistanceBetweenCenters(a, b) {
    var distance = getVisibleDistanceBetweenElements(a, b);
    var elementSize = Dimensions2d.fromElementOffset(a);
    var containerSize = getAncestorDimensions(b);
    return distance.add(Vector2d.fromVector(elementSize.subtract(containerSize)));
}
export { getDistanceBetweenCenters };
//# sourceMappingURL=get-distance-between-centers.js.map