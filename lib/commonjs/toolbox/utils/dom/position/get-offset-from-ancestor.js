"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffsetFromAncestor = void 0;
var vector_2d_1 = require("../../math/geometry/vector-2d");
var zero_vector_2d_1 = require("../../math/geometry/zero-vector-2d");
function getOffsetFromAncestor(element, ancestor) {
    if (!element || element === ancestor) {
        return zero_vector_2d_1.ZERO_VECTOR_2D;
    }
    else {
        return vector_2d_1.Vector2d.fromElementOffset(element)
            .add(getOffsetFromAncestor(element.offsetParent, ancestor));
    }
}
exports.getOffsetFromAncestor = getOffsetFromAncestor;
//# sourceMappingURL=get-offset-from-ancestor.js.map