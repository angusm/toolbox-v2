"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("../style/get-style");
function getDisplayedAnchors(querySelector) {
    return Array.from(document.querySelectorAll(querySelector))
        .filter(function (element) { return get_style_1.getStyle(element, 'display') !== 'none'; });
}
exports.getDisplayedAnchors = getDisplayedAnchors;
//# sourceMappingURL=get-displayed-anchors.js.map