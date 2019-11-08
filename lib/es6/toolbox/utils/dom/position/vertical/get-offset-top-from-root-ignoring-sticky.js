import { getOffsetTopIgnoringSticky } from "./get-offset-top-ignoring-sticky";
function getOffsetTopFromRootIgnoringSticky(element) {
    var candidateElement = element;
    var total = 0;
    while (candidateElement) {
        total += getOffsetTopIgnoringSticky(candidateElement);
        candidateElement = candidateElement.offsetParent;
    }
    return total;
}
window['getOffsetTopFromRootIgnoringSticky'] = getOffsetTopFromRootIgnoringSticky;
export { getOffsetTopFromRootIgnoringSticky };
//# sourceMappingURL=get-offset-top-from-root-ignoring-sticky.js.map