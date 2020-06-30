"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAnchorBeenSeen = void 0;
var is_above_1 = require("../position/is-above");
var is_displayed_1 = require("../style/is-displayed");
var get_anchors_with_common_selector_1 = require("./get-anchors-with-common-selector");
function hasAnchorBeenSeen(id, getCurrentAnchorFn, getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
    var targetedAnchor = document.querySelector("#" + id);
    if (!is_displayed_1.isDisplayed(targetedAnchor)) {
        return false;
    }
    var currentAnchor = getCurrentAnchorFn(getAnchorsFn);
    return currentAnchor.id === id || is_above_1.isAbove(targetedAnchor, currentAnchor);
}
exports.hasAnchorBeenSeen = hasAnchorBeenSeen;
//# sourceMappingURL=has-anchor-been-seen.js.map