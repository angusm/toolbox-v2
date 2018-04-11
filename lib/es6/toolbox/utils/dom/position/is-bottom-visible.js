import { Dimensions2d } from "../../math/geometry/dimensions-2d";
import { Range } from "../../math/range";
import { getVisibleDistanceBetweenElementBottoms } from "./get-visible-distance-between-element-bottoms";
import { isVisible } from "./is-visible";
function isBottomVisible(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    var acceptableRange = new Range(0, -Dimensions2d.fromElementOffset(container).height);
    return isVisible(target, container, factorInOpacity) &&
        acceptableRange
            .contains(getVisibleDistanceBetweenElementBottoms(target, container));
}
export { isBottomVisible };
//# sourceMappingURL=is-bottom-visible.js.map