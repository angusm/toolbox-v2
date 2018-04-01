"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_closest_to_center_1 = require("../position/get-closest-to-center");
var is_fully_visible_1 = require("../position/is-fully-visible");
var common_selector_1 = require("../common-selector");
var frame_memoize_1 = require("../../frame-memoize");
function getCurrentAnchorByCenter_(querySelector) {
    if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && is_fully_visible_1.isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = document.querySelectorAll(querySelector);
    return get_closest_to_center_1.getClosestToCenter(anchors);
}
var getCurrentAnchorByCenter = frame_memoize_1.frameMemoize(getCurrentAnchorByCenter_);
exports.getCurrentAnchorByCenter = getCurrentAnchorByCenter;
//# sourceMappingURL=get-current-anchor-by-center.js.map