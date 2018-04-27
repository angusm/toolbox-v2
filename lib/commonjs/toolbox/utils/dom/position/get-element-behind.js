"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_memoize_1 = require("../../frame-memoize");
var min_1 = require("../../array/min");
var get_distance_between_centers_1 = require("./get-distance-between-centers");
function getElementBehind_(targetElement, candidateElements) {
    return min_1.min(candidateElements, function (candidateElement) {
        return get_distance_between_centers_1.getDistanceBetweenCenters(targetElement, candidateElement).getLength();
    });
}
var getElementBehind = frame_memoize_1.frameMemoize(getElementBehind_);
exports.getElementBehind = getElementBehind;
//# sourceMappingURL=get-element-behind.js.map