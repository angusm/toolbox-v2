"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_memoize_1 = require("../../frame-memoize");
var get_visible_area_1 = require("./get-visible-area");
var max_1 = require("../../array/max");
function getElementBehind_(target, candidates) {
    return max_1.max(candidates, function (candidate) { return get_visible_area_1.getVisibleArea(target, candidate); });
}
var getElementBehind = frame_memoize_1.frameMemoize(getElementBehind_);
exports.getElementBehind = getElementBehind;
//# sourceMappingURL=get-element-behind.js.map