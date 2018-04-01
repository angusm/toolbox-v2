"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../../math/geometry/vector-2d");
var frame_memoize_1 = require("../../frame-memoize");
var memoized = frame_memoize_1.frameMemoize(getTransformFromAncestor_);
exports.getTransformFromAncestor = memoized;
function getTransformFromAncestor_(element, ancestor) {
    if (!element || element === ancestor) {
        return new vector_2d_1.Vector2d(0, 0);
    }
    else {
        return vector_2d_1.Vector2d.fromElementTransform(element)
            .add(memoized(element.offsetParent, ancestor));
    }
}
//# sourceMappingURL=get-transform-from-ancestor.js.map