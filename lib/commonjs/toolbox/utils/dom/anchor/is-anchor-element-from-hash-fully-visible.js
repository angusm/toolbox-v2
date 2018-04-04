"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_memoize_1 = require("../../frame-memoize");
var is_fully_visible_1 = require("../position/is-fully-visible");
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
function isAnchorElementFromHashFullyVisible_() {
    return get_anchor_element_from_hash_1.getAnchorElementFromHash() ?
        is_fully_visible_1.isFullyVisible(get_anchor_element_from_hash_1.getAnchorElementFromHash()) : false;
}
var isAnchorElementFromHashFullyVisible = frame_memoize_1.frameMemoize(isAnchorElementFromHashFullyVisible_);
exports.isAnchorElementFromHashFullyVisible = isAnchorElementFromHashFullyVisible;
//# sourceMappingURL=is-anchor-element-from-hash-fully-visible.js.map