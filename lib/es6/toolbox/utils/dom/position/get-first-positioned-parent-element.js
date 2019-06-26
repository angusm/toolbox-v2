import { isPositioned } from "./is-positioned";
import { getMatchingParentElement } from "../ancestry/get-matching-parent-element";
function getFirstPositionedParentElement(element) {
    return getMatchingParentElement(element, isPositioned);
}
export { getFirstPositionedParentElement };
//# sourceMappingURL=get-first-positioned-parent-element.js.map