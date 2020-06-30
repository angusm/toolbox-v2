"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementBehind = void 0;
var get_visible_area_1 = require("./get-visible-area");
var max_1 = require("../../array/max");
function getElementBehind(target, candidates) {
    return max_1.max(candidates, function (candidate) { return get_visible_area_1.getVisibleArea(target, candidate); });
}
exports.getElementBehind = getElementBehind;
//# sourceMappingURL=get-element-behind.js.map