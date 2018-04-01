"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
var frame_memoize_1 = require("../../frame-memoize");
function getAncestorDimensions_(ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (ancestor) {
        return dimensions_2d_1.Dimensions2d.fromElementOffset(ancestor);
    }
    else {
        return dimensions_2d_1.Dimensions2d.fromInnerWindow();
    }
}
var getAncestorDimensions = frame_memoize_1.frameMemoize(getAncestorDimensions_);
exports.getAncestorDimensions = getAncestorDimensions;
//# sourceMappingURL=get-ancestor-dimensions.js.map