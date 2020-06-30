"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAnchorElementFromHashDominant = void 0;
var get_anchor_element_from_hash_1 = require("./get-anchor-element-from-hash");
var is_element_dominant_1 = require("../position/is-element-dominant");
function isAnchorElementFromHashDominant() {
    var anchor = get_anchor_element_from_hash_1.getAnchorElementFromHash();
    return anchor ? is_element_dominant_1.isElementDominant(anchor) : false;
}
exports.isAnchorElementFromHashDominant = isAnchorElementFromHashDominant;
//# sourceMappingURL=is-anchor-element-from-hash-dominant.js.map