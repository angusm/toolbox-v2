import { Vector2d } from '../../math/geometry/vector-2d';
import { NumericRange } from '../../math/numeric-range';
import { getVisibleDistanceBetweenElements } from "./get-visible-distance-between-elements";
import { Dimensions2d } from "../../math/geometry/dimensions-2d";
import { getAncestorDimensions } from "./get-ancestor-dimensions";
function getDistanceOnAxisUntilVisible_(rawDistance, ancestorDistance, elementDistance) {
    var ancestorRange = new NumericRange(-elementDistance + 1, ancestorDistance - 1);
    if (ancestorRange.contains(rawDistance)) {
        return 0;
    }
    if (rawDistance > 0) {
        return rawDistance - ancestorDistance;
    }
    else {
        return rawDistance + elementDistance;
    }
}
function getDistanceUntilVisible(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    var ancestorDimensions = getAncestorDimensions(ancestor);
    var elementDimensions = Dimensions2d.fromElementOffset(element);
    var visibleDistance = getVisibleDistanceBetweenElements(element, ancestor);
    return new Vector2d(getDistanceOnAxisUntilVisible_(visibleDistance.x, ancestorDimensions.width, elementDimensions.width), getDistanceOnAxisUntilVisible_(visibleDistance.y, ancestorDimensions.height, elementDimensions.height));
}
export { getDistanceUntilVisible };
//# sourceMappingURL=get-distance-until-visible.js.map