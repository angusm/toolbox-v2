"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByDomHierarchy = void 0;
var run_map_as_switch_1 = require("../../run-map-as-switch");
var default_symbol_1 = require("../../default-symbol");
var DOM_SORT_SWITCH = new Map([
    [default_symbol_1.defaultSymbol, function () { return 0; }],
    [Node.DOCUMENT_POSITION_DISCONNECTED, function () { return 0; }],
    [Node.DOCUMENT_POSITION_PRECEDING, function () { return 1; }],
    [Node.DOCUMENT_POSITION_FOLLOWING, function () { return -1; }],
    [Node.DOCUMENT_POSITION_CONTAINS, function () { return 1; }],
    [Node.DOCUMENT_POSITION_CONTAINED_BY, function () { return -1; }],
    [Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC, function () { return 0; }],
]);
function sortByDomHierarchy(elements) {
    return elements
        .sort(function (elA, elB) {
        var compareResult = elA.compareDocumentPosition(elB);
        return run_map_as_switch_1.runMapAsSwitch(DOM_SORT_SWITCH, compareResult);
    });
}
exports.sortByDomHierarchy = sortByDomHierarchy;
//# sourceMappingURL=sort-by-dom-hierarchy.js.map