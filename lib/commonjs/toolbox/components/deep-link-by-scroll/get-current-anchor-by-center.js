"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_closest_to_center_1 = require("../../utils/dom/position/get-closest-to-center");
var is_fully_visible_1 = require("../../utils/dom/position/is-fully-visible");
function getCurrentAnchorByCenter() {
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && is_fully_visible_1.isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = document.querySelectorAll('[id]');
    return get_closest_to_center_1.getClosestToCenter(anchors);
}
exports.getCurrentAnchorByCenter = getCurrentAnchorByCenter;
//# sourceMappingURL=get-current-anchor-by-center.js.map