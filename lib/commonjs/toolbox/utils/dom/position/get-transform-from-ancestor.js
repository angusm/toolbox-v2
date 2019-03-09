"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../../math/geometry/vector-2d");
var zero_vector_2d_1 = require("../../math/geometry/zero-vector-2d");
function getTransformFromAncestor(element, ancestor) {
    if (!element || element === ancestor) {
        return zero_vector_2d_1.ZERO_VECTOR_2D;
    }
    else {
        return vector_2d_1.Vector2d.fromElementTransform(element)
            .add(getTransformFromAncestor(element.offsetParent, ancestor));
    }
}
exports.getTransformFromAncestor = getTransformFromAncestor;
//# sourceMappingURL=get-transform-from-ancestor.js.map