import { getStuckDistance } from "./get-stuck-distance";
function getOffsetFromAncestorIgnoringSticky(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (!element || element === ancestor) {
        return 0;
    }
    else {
        return element.offsetTop +
            getOffsetFromAncestorIgnoringSticky(element.offsetParent, ancestor) -
            getStuckDistance(element);
    }
}
export { getOffsetFromAncestorIgnoringSticky };
//# sourceMappingURL=get-offset-from-ancestor-ignoring-sticky.js.map