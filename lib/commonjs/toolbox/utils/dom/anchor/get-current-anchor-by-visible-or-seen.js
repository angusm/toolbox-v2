"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_fully_visible_1 = require("../position/is-fully-visible");
var common_selector_1 = require("../common-selector");
var frame_memoize_1 = require("../../frame-memoize");
var get_distance_until_visible_1 = require("../position/get-distance-until-visible");
var get_closest_to_center_1 = require("../position/get-closest-to-center");
function getCurrentAnchorByVisibleOrSeen_(querySelector) {
    if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && is_fully_visible_1.isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = Array.from(document.querySelectorAll(querySelector));
    var eligibleAnchors = anchors.filter(function (anchor) { return get_distance_until_visible_1.getDistanceUntilVisible(anchor).y <= 0; });
    return get_closest_to_center_1.getClosestToCenter(eligibleAnchors);
}
var getCurrentAnchorByVisibleOrSeen = frame_memoize_1.frameMemoize(getCurrentAnchorByVisibleOrSeen_);
exports.getCurrentAnchorByVisibleOrSeen = getCurrentAnchorByVisibleOrSeen;
//# sourceMappingURL=get-current-anchor-by-visible-or-seen.js.map