"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentAnchorBySeen = void 0;
var get_distance_until_visible_1 = require("../position/get-distance-until-visible");
var min_1 = require("../../array/min");
var is_anchor_element_from_hash_dominant_1 = require("./is-anchor-element-from-hash-dominant");
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
var get_anchors_with_common_selector_1 = require("./get-anchors-with-common-selector");
function getCurrentAnchorBySeen(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
    if (is_anchor_element_from_hash_dominant_1.isAnchorElementFromHashDominant()) {
        return get_anchor_element_from_hash_1.getAnchorElementFromHash();
    }
    var eligibleAnchors = getAnchorsFn().filter(function (anchor) { return get_distance_until_visible_1.getDistanceUntilVisible(anchor).y < 0; });
    return min_1.min(eligibleAnchors, function (a) { return Math.abs(get_distance_until_visible_1.getDistanceUntilVisible(a).y); });
}
exports.getCurrentAnchorBySeen = getCurrentAnchorBySeen;
//# sourceMappingURL=get-current-anchor-by-seen.js.map