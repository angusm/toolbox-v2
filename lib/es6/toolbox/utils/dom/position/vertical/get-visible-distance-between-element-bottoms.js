import { getVisibleDistanceBetweenElements } from "./get-visible-distance-between-elements";
import { Dimensions2d } from "../../../math/geometry/dimensions-2d";
function getVisibleDistanceBetweenElementBottoms(target, container) {
    if (container === void 0) { container = null; }
    return getVisibleDistanceBetweenElements(target, container) +
        Dimensions2d.fromElementOffset(target).height -
        Dimensions2d.fromElementOffset(container).height;
}
export { getVisibleDistanceBetweenElementBottoms };
//# sourceMappingURL=get-visible-distance-between-element-bottoms.js.map