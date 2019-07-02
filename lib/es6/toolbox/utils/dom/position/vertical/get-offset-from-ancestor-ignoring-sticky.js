import { getOffsetTopIgnoringSticky } from "./get-offset-top-ignoring-sticky";
var ignoredPositions = new Set(['fixed', 'absolute', 'relative']);
function getOffsetFromAncestorIgnoringSticky(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (!element || element === ancestor) {
        return 0;
    }
    else {
        return getOffsetTopIgnoringSticky(element) +
            getOffsetFromAncestorIgnoringSticky(element.offsetParent, ancestor);
    }
}
export { getOffsetFromAncestorIgnoringSticky };
//# sourceMappingURL=get-offset-from-ancestor-ignoring-sticky.js.map