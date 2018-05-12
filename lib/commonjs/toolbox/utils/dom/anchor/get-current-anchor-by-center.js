"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_closest_to_center_1 = require("../position/get-closest-to-center");
var frame_memoize_1 = require("../../frame-memoize");
var get_displayed_anchors_1 = require("./get-displayed-anchors");
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
var is_anchor_element_from_hash_fully_visible_1 = require("./is-anchor-element-from-hash-fully-visible");
var get_anchors_with_common_selector_1 = require("./get-anchors-with-common-selector");
function getCurrentAnchorByCenter_(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
    return is_anchor_element_from_hash_fully_visible_1.isAnchorElementFromHashFullyVisible() ?
        get_anchor_element_from_hash_1.getAnchorElementFromHash() :
        get_closest_to_center_1.getClosestToCenter(get_displayed_anchors_1.getDisplayedAnchors(getAnchorsFn));
}
var getCurrentAnchorByCenter = frame_memoize_1.frameMemoize(getCurrentAnchorByCenter_);
exports.getCurrentAnchorByCenter = getCurrentAnchorByCenter;
//# sourceMappingURL=get-current-anchor-by-center.js.map