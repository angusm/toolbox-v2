"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_area_1 = require("./get-visible-area");
var max_1 = require("../../iterable/max");
var get_distance_until_visible_1 = require("./get-distance-until-visible");
function getMostVisibleElement(elements, container, factorInOpacity) {
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return max_1.max(elements, function (element) {
        var visibleArea = get_visible_area_1.getVisibleArea(element, container, factorInOpacity);
        if (visibleArea > 0) {
            return visibleArea;
        }
        else {
            return Math.abs(get_distance_until_visible_1.getDistanceUntilVisible(element, container).getLength());
        }
    });
}
exports.getMostVisibleElement = getMostVisibleElement;
//# sourceMappingURL=get-most-visible-element.js.map