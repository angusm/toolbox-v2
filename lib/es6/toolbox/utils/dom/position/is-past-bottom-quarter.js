import { Dimensions2d } from "../../math/geometry/dimensions-2d";
import { getVisibleDistanceBetweenElements } from "./get-visible-distance-between-elements";
function isPastBottomQuarter(target, container) {
    if (container === void 0) { container = null; }
    var yDistance = getVisibleDistanceBetweenElements(target, container).y;
    var threeQuartersHeight = Dimensions2d.fromElementOffset(container).height * (3 / 4);
    return yDistance < threeQuartersHeight;
}
export { isPastBottomQuarter };
//# sourceMappingURL=is-past-bottom-quarter.js.map