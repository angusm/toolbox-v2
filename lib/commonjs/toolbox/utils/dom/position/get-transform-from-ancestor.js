"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../../math/geometry/vector-2d");
function getTransformFromAncestor(element, ancestor) {
    if (!element || element === ancestor) {
        return new vector_2d_1.Vector2d(0, 0);
    }
    else {
        return vector_2d_1.Vector2d.fromElementTransform(element)
            .add(getTransformFromAncestor(element.offsetParent, ancestor));
    }
}
exports.getTransformFromAncestor = getTransformFromAncestor;
//# sourceMappingURL=get-transform-from-ancestor.js.map