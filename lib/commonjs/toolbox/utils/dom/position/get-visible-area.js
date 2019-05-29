"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_opacity_1 = require("../style/get-opacity");
var get_visible_dimensions_1 = require("./get-visible-dimensions");
var is_visible_1 = require("../style/is-visible");
function getVisibleArea(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    if (!is_visible_1.isVisible(target)) {
        return 0;
    }
    var opacityFactor = factorInOpacity ? get_opacity_1.getOpacity(target) : 1;
    return get_visible_dimensions_1.getVisibleDimensions(target, container).getArea() * opacityFactor;
}
exports.getVisibleArea = getVisibleArea;
//# sourceMappingURL=get-visible-area.js.map