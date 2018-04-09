import { Dimensions2d } from "../../math/geometry/dimensions-2d";
import { Range } from "../../math/range";
import { getVisibleDistanceBetweenElementBottoms } from "./get-visible-distance-between-element-bottoms";
function isBottomVisible(target, container) {
    if (container === void 0) { container = null; }
    var acceptableRange = new Range(0, -Dimensions2d.fromElementOffset(container).height);
    return acceptableRange
        .contains(getVisibleDistanceBetweenElementBottoms(target, container));
}
export { isBottomVisible };
//# sourceMappingURL=is-bottom-visible.js.map