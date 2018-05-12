"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_closest_to_top_without_going_over_1 = require("../position/get-closest-to-top-without-going-over");
var get_displayed_anchors_1 = require("./get-displayed-anchors");
var is_anchor_element_from_hash_dominant_1 = require("./is-anchor-element-from-hash-dominant");
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
var get_anchors_with_common_selector_1 = require("./get-anchors-with-common-selector");
function getCurrentAnchorByTop(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
    return is_anchor_element_from_hash_dominant_1.isAnchorElementFromHashDominant() ?
        get_anchor_element_from_hash_1.getAnchorElementFromHash() :
        get_closest_to_top_without_going_over_1.getClosestToTopWithoutGoingOver(get_displayed_anchors_1.getDisplayedAnchors(getAnchorsFn));
}
exports.getCurrentAnchorByTop = getCurrentAnchorByTop;
//# sourceMappingURL=get-current-anchor-by-top.js.map