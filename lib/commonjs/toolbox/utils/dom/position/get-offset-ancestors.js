"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_memoize_1 = require("../../frame-memoize");
var getOffsetAncestors = frame_memoize_1.frameMemoize(getOffsetAncestors_);
exports.getOffsetAncestors = getOffsetAncestors;
function getOffsetAncestors_(element, terminusAncestor) {
    if (terminusAncestor === void 0) { terminusAncestor = null; }
    if (!element || element === terminusAncestor) {
        return [];
    }
    return [element].concat(getOffsetAncestors(element.offsetParent, terminusAncestor));
}
//# sourceMappingURL=get-offset-ancestors.js.map