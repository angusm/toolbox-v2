"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("../../style/get-style");
var ignoredPositions = new Set(['fixed', 'absolute']);
function getOffsetTopIgnoringSticky(element) {
    var position = get_style_1.getStyle(element, 'position');
    if (position !== 'sticky') {
        return element.offsetTop;
    }
    else {
        var previousSiblingHeight = 0;
        var previousSibling = element.previousElementSibling;
        while (previousSibling) {
            if (!ignoredPositions.has(get_style_1.getStyle(previousSibling, 'position'))) {
                previousSiblingHeight += previousSibling.offsetHeight;
            }
            previousSibling = previousSibling.previousElementSibling;
        }
        return previousSiblingHeight;
    }
}
exports.getOffsetTopIgnoringSticky = getOffsetTopIgnoringSticky;
//# sourceMappingURL=get-offset-top-ignoring-sticky.js.map