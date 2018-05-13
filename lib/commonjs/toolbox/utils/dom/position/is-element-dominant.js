"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_fully_visible_1 = require("./is-fully-visible");
var is_filling_visible_area_1 = require("./is-filling-visible-area");
function isElementDominant(element) {
    return is_fully_visible_1.isFullyVisible(element) || is_filling_visible_area_1.isFillingVisibleArea(element);
}
exports.isElementDominant = isElementDominant;
//# sourceMappingURL=is-element-dominant.js.map