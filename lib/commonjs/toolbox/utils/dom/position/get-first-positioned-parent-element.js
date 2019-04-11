"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_positioned_1 = require("./is-positioned");
function getFirstPositionedParentElement(element) {
    var candidate = element.parentElement;
    while (candidate) {
        if (is_positioned_1.isPositioned(candidate)) {
            return candidate;
        }
        candidate = candidate.parentElement;
    }
    return null;
}
exports.getFirstPositionedParentElement = getFirstPositionedParentElement;
//# sourceMappingURL=get-first-positioned-parent-element.js.map