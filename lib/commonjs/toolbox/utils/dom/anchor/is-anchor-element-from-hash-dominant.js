"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_fully_visible_1 = require("../position/is-fully-visible");
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
var is_filling_visible_area_1 = require("../position/is-filling-visible-area");
function isAnchorElementFromHashDominant() {
    return get_anchor_element_from_hash_1.getAnchorElementFromHash() ?
        is_fully_visible_1.isFullyVisible(get_anchor_element_from_hash_1.getAnchorElementFromHash()) ||
            is_filling_visible_area_1.isFillingVisibleArea(get_anchor_element_from_hash_1.getAnchorElementFromHash()) :
        false;
}
exports.isAnchorElementFromHashDominant = isAnchorElementFromHashDominant;
//# sourceMappingURL=is-anchor-element-from-hash-dominant.js.map