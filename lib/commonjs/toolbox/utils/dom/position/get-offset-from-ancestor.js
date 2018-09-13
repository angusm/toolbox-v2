"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../../math/geometry/vector-2d");
function getOffsetFromAncestor(element, ancestor) {
    if (!element || element === ancestor) {
        return new vector_2d_1.Vector2d(0, 0);
    }
    else {
        return vector_2d_1.Vector2d.fromElementOffset(element)
            .add(getOffsetFromAncestor(element.offsetParent, ancestor));
    }
}
exports.getOffsetFromAncestor = getOffsetFromAncestor;
//# sourceMappingURL=get-offset-from-ancestor.js.map