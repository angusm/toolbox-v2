import { Dimensions2d } from "../../../math/geometry/dimensions-2d";
import { getVisibleDistanceBetweenElements } from "../get-visible-distance-between-elements";
function generateIsPastFunction(fraction) {
    return function (target, container) {
        if (container === void 0) { container = null; }
        var yDistance = getVisibleDistanceBetweenElements(target, container).y;
        var threeQuartersHeight = Dimensions2d.fromElementOffset(container).height * (1 - fraction);
        return yDistance < threeQuartersHeight;
    };
}
export { generateIsPastFunction };
//# sourceMappingURL=generate-is-past-function.js.map