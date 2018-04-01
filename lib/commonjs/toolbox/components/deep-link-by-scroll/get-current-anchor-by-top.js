"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_closest_to_top_without_going_over_1 = require("../../utils/dom/position/get-closest-to-top-without-going-over");
var is_fully_visible_1 = require("../../utils/dom/position/is-fully-visible");
var common_selector_1 = require("../../utils/dom/common-selector");
function getCurrentAnchorByTop(querySelector) {
    if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && is_fully_visible_1.isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = document.querySelectorAll(querySelector);
    return get_closest_to_top_without_going_over_1.getClosestToTopWithoutGoingOver(anchors);
}
exports.getCurrentAnchorByTop = getCurrentAnchorByTop;
//# sourceMappingURL=get-current-anchor-by-top.js.map