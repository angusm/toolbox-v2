"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_memoize_1 = require("../../frame-memoize");
var min_1 = require("../../array/min");
var get_distance_between_centers_1 = require("./get-distance-between-centers");
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
function getElementBehind_(target, candidates) {
    var candidatesBehindElement = candidates.filter(function (candidate) {
        var dimensions = dimensions_2d_1.Dimensions2d.fromElementOffset(candidate);
        var distance = get_distance_between_centers_1.getDistanceBetweenCenters(target, candidate);
        return distance.x <= dimensions.width / 2 &&
            distance.y <= dimensions.height / 2;
    });
    return min_1.min(candidatesBehindElement, function (candidate) { return get_distance_between_centers_1.getDistanceBetweenCenters(target, candidate).getLength(); });
}
var getElementBehind = frame_memoize_1.frameMemoize(getElementBehind_);
exports.getElementBehind = getElementBehind;
//# sourceMappingURL=get-element-behind.js.map