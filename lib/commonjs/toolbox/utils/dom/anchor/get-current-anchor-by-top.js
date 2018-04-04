"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_closest_to_top_without_going_over_1 = require("../position/get-closest-to-top-without-going-over");
var is_fully_visible_1 = require("../position/is-fully-visible");
var common_selector_1 = require("../common-selector");
var frame_memoize_1 = require("../../frame-memoize");
var get_displayed_anchors_1 = require("./get-displayed-anchors");
function getCurrentAnchorByTop_(querySelector) {
    if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && is_fully_visible_1.isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    return get_closest_to_top_without_going_over_1.getClosestToTopWithoutGoingOver(get_displayed_anchors_1.getDisplayedAnchors(querySelector));
}
var getCurrentAnchorByTop = frame_memoize_1.frameMemoize(getCurrentAnchorByTop_);
exports.getCurrentAnchorByTop = getCurrentAnchorByTop;
//# sourceMappingURL=get-current-anchor-by-top.js.map