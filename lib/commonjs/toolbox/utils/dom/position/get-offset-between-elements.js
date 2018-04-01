"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_common_offset_ancestor_1 = require("./get-common-offset-ancestor");
var get_offset_from_ancestor_1 = require("./get-offset-from-ancestor");
function getOffsetBetweenElements(a, b) {
    var commonAncestor = get_common_offset_ancestor_1.getCommonOffsetAncestor(a, b);
    return get_offset_from_ancestor_1.getOffsetFromAncestor(a, commonAncestor)
        .subtract(get_offset_from_ancestor_1.getOffsetFromAncestor(b, commonAncestor));
}
exports.getOffsetBetweenElements = getOffsetBetweenElements;
//# sourceMappingURL=get-offset-between-elements.js.map