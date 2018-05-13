"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_memoize_1 = require("../../frame-memoize");
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
var get_anchors_with_common_selector_1 = require("./get-anchors-with-common-selector");
var is_element_dominant_1 = require("../position/is-element-dominant");
var contains_1 = require("../../array/contains");
var get_current_anchor_by_center_1 = require("./get-current-anchor-by-center");
var is_visible_1 = require("../position/is-visible");
var is_scrolled_past_1 = require("../position/is-scrolled-past");
var get_distance_between_centers_1 = require("../position/get-distance-between-centers");
function getCurrentAnchorByVisibleOrSeen_(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
    var anchorElementFromHash = get_anchor_element_from_hash_1.getAnchorElementFromHash();
    var anchors = getAnchorsFn();
    var useAnchorFromElementHash = contains_1.contains(anchors, anchorElementFromHash) &&
        is_element_dominant_1.isElementDominant(anchorElementFromHash);
    if (useAnchorFromElementHash) {
        return anchorElementFromHash;
    }
    var eligibleAnchors = getAnchorsFn()
        .filter(function (anchor) { return is_visible_1.isVisible(anchor); })
        .filter(function (anchor) { return is_scrolled_past_1.isScrolledPast(anchor); })
        .filter(function (anchor) {
        return get_distance_between_centers_1.getDistanceBetweenCenters(anchor).getLength() <
            window.innerHeight / 2;
    });
    return get_current_anchor_by_center_1.getCurrentAnchorByCenter(function () { return eligibleAnchors; });
}
var getCurrentAnchorByVisibleOrSeen = frame_memoize_1.frameMemoize(getCurrentAnchorByVisibleOrSeen_);
exports.getCurrentAnchorByVisibleOrSeen = getCurrentAnchorByVisibleOrSeen;
//# sourceMappingURL=get-current-anchor-by-visible-or-seen.js.map