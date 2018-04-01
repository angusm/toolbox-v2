"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_closest_to_top_without_going_over_1 = require("../../utils/dom/position/get-closest-to-top-without-going-over");
var is_fully_visible_1 = require("../../utils/dom/position/is-fully-visible");
function getCurrentAnchorByTop() {
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && is_fully_visible_1.isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = document.querySelectorAll('[id]');
    return get_closest_to_top_without_going_over_1.getClosestToTopWithoutGoingOver(anchors);
}
exports.getCurrentAnchorByTop = getCurrentAnchorByTop;
//# sourceMappingURL=get-current-anchor-by-top.js.map