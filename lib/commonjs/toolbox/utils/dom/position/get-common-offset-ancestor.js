"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_offset_ancestors_1 = require("./get-offset-ancestors");
var get_last_matching_index_1 = require("../../array/get-last-matching-index");
function getCommonOffsetAncestor() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    var reversedAncestorLists = elements.map(function (element) { return get_offset_ancestors_1.getOffsetAncestors(element); }).reverse();
    var ancestorIndex = get_last_matching_index_1.getLastMatchingIndex.apply(void 0, reversedAncestorLists);
    return reversedAncestorLists[0][ancestorIndex];
}
exports.getCommonOffsetAncestor = getCommonOffsetAncestor;
//# sourceMappingURL=get-common-offset-ancestor.js.map