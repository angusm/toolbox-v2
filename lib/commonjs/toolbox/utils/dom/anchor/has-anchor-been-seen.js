"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_selector_1 = require("../common-selector");
var is_above_1 = require("../position/is-above");
var is_displayed_1 = require("../style/is-displayed");
function hasAnchorBeenSeen(id, getCurrentAnchorFn, anchorsQuerySelector) {
    if (anchorsQuerySelector === void 0) { anchorsQuerySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
    var targetedAnchor = document.querySelector("#" + id);
    if (!is_displayed_1.isDisplayed(targetedAnchor)) {
        return false;
    }
    var currentAnchor = getCurrentAnchorFn(anchorsQuerySelector);
    return currentAnchor.id === id ||
        is_above_1.isAbove(targetedAnchor, currentAnchor);
}
exports.hasAnchorBeenSeen = hasAnchorBeenSeen;
//# sourceMappingURL=has-anchor-been-seen.js.map