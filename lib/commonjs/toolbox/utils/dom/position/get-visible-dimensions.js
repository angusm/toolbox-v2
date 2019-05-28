"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
var get_visible_height_1 = require("./vertical/get-visible-height");
var get_visible_width_1 = require("./horizontal/get-visible-width");
function getVisibleDimensions(target, container) {
    if (container === void 0) { container = null; }
    return new dimensions_2d_1.Dimensions2d(get_visible_width_1.getVisibleWidth(target, container), get_visible_height_1.getVisibleHeight(target, container));
}
exports.getVisibleDimensions = getVisibleDimensions;
//# sourceMappingURL=get-visible-dimensions.js.map