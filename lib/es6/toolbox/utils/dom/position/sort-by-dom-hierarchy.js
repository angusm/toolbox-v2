import { runMapAsSwitch } from "../../run-map-as-switch";
import { defaultSymbol } from "../../default-symbol";
var DOM_SORT_SWITCH = new Map([
    [defaultSymbol, function () { return 0; }],
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
        return runMapAsSwitch(DOM_SORT_SWITCH, compareResult);
    });
}
export { sortByDomHierarchy };
//# sourceMappingURL=sort-by-dom-hierarchy.js.map