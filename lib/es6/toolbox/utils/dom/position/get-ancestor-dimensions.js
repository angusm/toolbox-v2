import { Dimensions2d } from "../../math/geometry/dimensions-2d";
import { frameMemoize } from "../../frame-memoize";
function getAncestorDimensions_(ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (ancestor) {
        return Dimensions2d.fromElementOffset(ancestor);
    }
    else {
        return Dimensions2d.fromInnerWindow();
    }
}
var getAncestorDimensions = frameMemoize(getAncestorDimensions_);
export { getAncestorDimensions };
//# sourceMappingURL=get-ancestor-dimensions.js.map