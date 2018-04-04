"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_memoize_1 = require("../../frame-memoize");
function getAnchorElementFromHash_() {
    var hash = window.location.hash;
    return hash ? document.querySelector(hash) : null;
}
var getAnchorElementFromHash = frame_memoize_1.frameMemoize(getAnchorElementFromHash_);
exports.getAnchorElementFromHash = getAnchorElementFromHash;
//# sourceMappingURL=get-anchor-element-from-hash.js.map