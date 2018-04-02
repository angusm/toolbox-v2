"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_closest_to_center_1 = require("../position/get-closest-to-center");
var frame_memoize_1 = require("../../frame-memoize");
var is_above_1 = require("../position/is-above");
function getCurrentAnchorFromLimitedSet_(limitedQuerySelector, getCurrentAnchor) {
    return frame_memoize_1.frameMemoize(function (querySelector) {
        var baseResult = getCurrentAnchor(querySelector);
        var limitedCandidates = Array.from(document.querySelectorAll(limitedQuerySelector));
        if (limitedCandidates.indexOf(baseResult) !== -1) {
            return baseResult;
        }
        var resultsAboveBase = limitedCandidates.filter(function (candidate) { return is_above_1.isAbove(candidate, baseResult); });
        return get_closest_to_center_1.getClosestToCenter(resultsAboveBase);
    });
}
var getCurrentAnchorFromLimitedSet = frame_memoize_1.frameMemoize(getCurrentAnchorFromLimitedSet_);
exports.getCurrentAnchorFromLimitedSet = getCurrentAnchorFromLimitedSet;
//# sourceMappingURL=get-current-anchor-from-limited-set.js.map