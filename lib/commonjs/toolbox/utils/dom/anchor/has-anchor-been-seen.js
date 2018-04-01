"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_selector_1 = require("../common-selector");
var is_above_1 = require("../position/is-above");
function hasAnchorBeenSeen(id, getCurrentAnchorFn, anchorsQuerySelector) {
    if (anchorsQuerySelector === void 0) { anchorsQuerySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
    var currentAnchor = getCurrentAnchorFn(anchorsQuerySelector);
    return currentAnchor.id === id ||
        is_above_1.isAbove(document.querySelector("#" + id), currentAnchor);
}
exports.hasAnchorBeenSeen = hasAnchorBeenSeen;
//# sourceMappingURL=has-anchor-been-seen.js.map