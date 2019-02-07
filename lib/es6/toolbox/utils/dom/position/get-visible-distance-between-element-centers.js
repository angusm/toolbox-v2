import { Dimensions2d } from '../../math/geometry/dimensions-2d';
import { getVisibleDistanceBetweenElements } from './get-visible-distance-between-elements';
import { Vector2d } from "../../math/geometry/vector-2d";
import { getAncestorDimensions } from "./get-ancestor-dimensions";
function getVisibleDistanceBetweenElementCenters(a, b) {
    var distance = getVisibleDistanceBetweenElements(a, b);
    var elementSize = Dimensions2d.fromElementOffset(a).scale(.5);
    var containerSize = getAncestorDimensions(b).scale(.5);
    return distance.add(Vector2d.fromVector(elementSize.subtract(containerSize)));
}
export { getVisibleDistanceBetweenElementCenters };
//# sourceMappingURL=get-visible-distance-between-element-centers.js.map