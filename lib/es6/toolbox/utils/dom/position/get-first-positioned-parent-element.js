import { isPositioned } from "./is-positioned";
function getFirstPositionedParentElement(element) {
    var candidate = element.parentElement;
    while (candidate) {
        if (isPositioned(candidate)) {
            return candidate;
        }
        candidate = candidate.parentElement;
    }
    return null;
}
export { getFirstPositionedParentElement };
//# sourceMappingURL=get-first-positioned-parent-element.js.map