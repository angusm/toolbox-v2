"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
var get_anchors_with_common_selector_1 = require("./get-anchors-with-common-selector");
var is_element_dominant_1 = require("../position/is-element-dominant");
var contains_1 = require("../../array/contains");
var is_visible_1 = require("../style/is-visible");
var is_displayed_1 = require("../style/is-displayed");
var get_visible_distance_from_root_1 = require("../position/get-visible-distance-from-root");
var max_1 = require("../../array/max");
var get_distance_until_visible_1 = require("../position/get-distance-until-visible");
var get_visible_distance_between_element_centers_1 = require("../position/vertical/get-visible-distance-between-element-centers");
var scroll_element_1 = require("../position/scroll-element");
function getCurrentAnchorByVisibleOrSeen(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
    var anchorElementFromHash = get_anchor_element_from_hash_1.getAnchorElementFromHash();
    var anchors = getAnchorsFn();
    var useAnchorFromElementHash = contains_1.contains(anchors, anchorElementFromHash) &&
        is_element_dominant_1.isElementDominant(anchorElementFromHash);
    if (useAnchorFromElementHash) {
        return anchorElementFromHash;
    }
    var eligibleAnchors = getAnchorsFn()
        .filter(function (anchor) { return get_distance_until_visible_1.getDistanceUntilVisible(anchor).y <= 0; })
        .filter(function (anchor) { return is_visible_1.isVisible(anchor) && is_displayed_1.isDisplayed(anchor); })
        .filter(function (anchor) {
        return get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(anchor, null) <=
            scroll_element_1.SCROLL_ELEMENT.clientHeight / 2;
    });
    return max_1.max(eligibleAnchors, function (el) { return get_visible_distance_from_root_1.getVisibleDistanceFromRoot(el).y; });
}
exports.getCurrentAnchorByVisibleOrSeen = getCurrentAnchorByVisibleOrSeen;
;
//# sourceMappingURL=get-current-anchor-by-visible-or-seen.js.map