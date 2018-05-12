"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_fully_visible_1 = require("../position/is-fully-visible");
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
function isAnchorElementFromHashFullyVisible() {
    return get_anchor_element_from_hash_1.getAnchorElementFromHash() ?
        is_fully_visible_1.isFullyVisible(get_anchor_element_from_hash_1.getAnchorElementFromHash()) : false;
}
exports.isAnchorElementFromHashFullyVisible = isAnchorElementFromHashFullyVisible;
//# sourceMappingURL=is-anchor-element-from-hash-fully-visible.js.map