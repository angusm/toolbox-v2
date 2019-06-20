import { getStyle } from "../style/get-style";
function getFirstStickyParentElement(element) {
    var candidate = element.parentElement;
    while (candidate) {
        if (getStyle(candidate, 'position') === 'sticky') {
            return candidate;
        }
        candidate = candidate.parentElement;
    }
    return null;
}
export { getFirstStickyParentElement };
//# sourceMappingURL=get-first-sticky-parent-element.js.map