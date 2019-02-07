"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_area_1 = require("./get-visible-area");
var is_displayed_1 = require("../style/is-displayed");
function isFillingVisibleArea(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    var visibleArea = get_visible_area_1.getVisibleArea(target, container, factorInOpacity);
    return is_displayed_1.isDisplayed(target) &&
        visibleArea > 0 &&
        visibleArea === window.innerWidth * window.innerHeight;
}
exports.isFillingVisibleArea = isFillingVisibleArea;
//# sourceMappingURL=is-filling-visible-area.js.map