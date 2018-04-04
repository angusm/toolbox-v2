"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_closest_to_center_1 = require("../position/get-closest-to-center");
var common_selector_1 = require("../common-selector");
var frame_memoize_1 = require("../../frame-memoize");
var get_displayed_anchors_1 = require("./get-displayed-anchors");
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
var is_anchor_element_from_hash_fully_visible_1 = require("./is-anchor-element-from-hash-fully-visible");
function getCurrentAnchorByCenter_(querySelector) {
    if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
    return is_anchor_element_from_hash_fully_visible_1.isAnchorElementFromHashFullyVisible() ?
        get_anchor_element_from_hash_1.getAnchorElementFromHash() :
        get_closest_to_center_1.getClosestToCenter(get_displayed_anchors_1.getDisplayedAnchors(querySelector));
}
var getCurrentAnchorByCenter = frame_memoize_1.frameMemoize(getCurrentAnchorByCenter_);
exports.getCurrentAnchorByCenter = getCurrentAnchorByCenter;
//# sourceMappingURL=get-current-anchor-by-center.js.map