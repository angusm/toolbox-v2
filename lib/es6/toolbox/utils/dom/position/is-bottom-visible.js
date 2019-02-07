import { Dimensions2d } from "../../math/geometry/dimensions-2d";
import { NumericRange } from "../../math/numeric-range";
import { getVisibleDistanceBetweenElementBottoms } from "./vertical/get-visible-distance-between-element-bottoms";
import { isVisible } from "./is-visible";
function isBottomVisible(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    var acceptableRange = new NumericRange(-Dimensions2d.fromElementOffset(container).height, 0);
    return isVisible(target, container, factorInOpacity) &&
        acceptableRange
            .contains(getVisibleDistanceBetweenElementBottoms(target, container));
}
export { isBottomVisible };
//# sourceMappingURL=is-bottom-visible.js.map