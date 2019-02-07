"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_area_1 = require("./get-visible-area");
var max_1 = require("../../iterable/max");
function getMostVisibleElement(elements, container, factorInOpacity) {
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return max_1.max(elements, function (element) { return get_visible_area_1.getVisibleArea(element, container, factorInOpacity); });
}
exports.getMostVisibleElement = getMostVisibleElement;
//# sourceMappingURL=get-most-visible-element.js.map