"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnchorElementFromHash = void 0;
function getAnchorElementFromHash() {
    var hash = window.location.hash;
    return hash ? document.querySelector(hash) : null;
}
exports.getAnchorElementFromHash = getAnchorElementFromHash;
//# sourceMappingURL=get-anchor-element-from-hash.js.map