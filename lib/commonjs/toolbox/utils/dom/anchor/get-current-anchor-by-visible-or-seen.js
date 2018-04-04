"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_selector_1 = require("../common-selector");
var frame_memoize_1 = require("../../frame-memoize");
var get_distance_until_visible_1 = require("../position/get-distance-until-visible");
var min_1 = require("../../array/min");
var get_displayed_anchors_1 = require("./get-displayed-anchors");
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
var is_anchor_element_from_hash_fully_visible_1 = require("./is-anchor-element-from-hash-fully-visible");
function getCurrentAnchorByVisibleOrSeen_(querySelector) {
    if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
    if (is_anchor_element_from_hash_fully_visible_1.isAnchorElementFromHashFullyVisible()) {
        return get_anchor_element_from_hash_1.getAnchorElementFromHash();
    }
    var eligibleAnchors = get_displayed_anchors_1.getDisplayedAnchors(querySelector)
        .filter(function (anchor) { return get_distance_until_visible_1.getDistanceUntilVisible(anchor).y <= 0; });
    return min_1.min(eligibleAnchors, function (a) { return Math.abs(get_distance_until_visible_1.getDistanceUntilVisible(a).y); });
}
var getCurrentAnchorByVisibleOrSeen = frame_memoize_1.frameMemoize(getCurrentAnchorByVisibleOrSeen_);
exports.getCurrentAnchorByVisibleOrSeen = getCurrentAnchorByVisibleOrSeen;
//# sourceMappingURL=get-current-anchor-by-visible-or-seen.js.map