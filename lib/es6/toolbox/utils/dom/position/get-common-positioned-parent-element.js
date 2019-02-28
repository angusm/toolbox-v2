import { getLastMatchingIndex } from '../../array/get-last-matching-index';
import { getParentElements } from "./get-parent-elements";
import { isPositioned } from "./is-positioned";
function getCommonPositionedParentElement() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    var reversedAncestorLists = elements
        .map(function (element) {
        return getParentElements(element).filter(isPositioned).reverse();
    });
    var ancestorIndex = getLastMatchingIndex.apply(void 0, reversedAncestorLists);
    return reversedAncestorLists[0][ancestorIndex];
}
export { getCommonPositionedParentElement };
//# sourceMappingURL=get-common-positioned-parent-element.js.map