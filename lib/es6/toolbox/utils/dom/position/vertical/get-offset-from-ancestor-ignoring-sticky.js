import { getOffsetTopIgnoringSticky } from "./get-offset-top-ignoring-sticky";
import { getStyle } from "../../style/get-style";
var ignoredPositions = new Set(['fixed', 'absolute', 'relative']);
function getOffsetFromAncestorIgnoringSticky(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (!element || element === ancestor) {
        return 0;
    }
    else if (ignoredPositions.has(getStyle(element, 'position'))) {
        return getOffsetTopIgnoringSticky(element) +
            getOffsetFromAncestorIgnoringSticky(element.offsetParent, ancestor);
    }
    else {
        return getOffsetTopIgnoringSticky(element) +
            getOffsetFromAncestorIgnoringSticky(element.parentElement, ancestor);
    }
}
export { getOffsetFromAncestorIgnoringSticky };
//# sourceMappingURL=get-offset-from-ancestor-ignoring-sticky.js.map