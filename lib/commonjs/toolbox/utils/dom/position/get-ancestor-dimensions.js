"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
function getAncestorDimensions(ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (ancestor) {
        return dimensions_2d_1.Dimensions2d.fromElementOffset(ancestor);
    }
    else {
        return dimensions_2d_1.Dimensions2d.fromRootElement();
    }
}
exports.getAncestorDimensions = getAncestorDimensions;
//# sourceMappingURL=get-ancestor-dimensions.js.map