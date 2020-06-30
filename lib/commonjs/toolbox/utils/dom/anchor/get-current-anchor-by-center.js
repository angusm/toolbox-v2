"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentAnchorByCenter = void 0;
var get_closest_to_center_1 = require("../position/get-closest-to-center");
var get_displayed_anchors_1 = require("./get-displayed-anchors");
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
var get_anchors_with_common_selector_1 = require("./get-anchors-with-common-selector");
var is_element_dominant_1 = require("../position/is-element-dominant");
var contains_1 = require("../../array/contains");
function getCurrentAnchorByCenter(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
    var anchorElementFromHash = get_anchor_element_from_hash_1.getAnchorElementFromHash();
    var anchors = getAnchorsFn();
    var useAnchorFromElementHash = contains_1.contains(anchors, anchorElementFromHash) &&
        is_element_dominant_1.isElementDominant(anchorElementFromHash);
    return useAnchorFromElementHash ?
        anchorElementFromHash :
        get_closest_to_center_1.getClosestToCenter(get_displayed_anchors_1.getDisplayedAnchors(function () { return anchors; }));
}
exports.getCurrentAnchorByCenter = getCurrentAnchorByCenter;
//# sourceMappingURL=get-current-anchor-by-center.js.map