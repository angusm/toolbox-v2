"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAncestorHeight = void 0;
var root_element_1 = require("../root-element");
function getAncestorHeight(ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    return ancestor ? ancestor.offsetHeight : root_element_1.ROOT_ELEMENT.clientHeight;
}
exports.getAncestorHeight = getAncestorHeight;
//# sourceMappingURL=get-ancestor-height.js.map