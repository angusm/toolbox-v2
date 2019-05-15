import { Dimensions2d } from "../../math/geometry/dimensions-2d";
function getAncestorDimensions(ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (ancestor) {
        return Dimensions2d.fromElementOffset(ancestor);
    }
    else {
        return Dimensions2d.fromScrollElementClient();
    }
}
export { getAncestorDimensions };
//# sourceMappingURL=get-ancestor-dimensions.js.map