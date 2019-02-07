import { getOffsetAncestors } from './get-offset-ancestors';
import { getLastMatchingIndex } from '../../array/get-last-matching-index';
function getCommonOffsetAncestor() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    var reversedAncestorLists = elements.map(function (element) { return getOffsetAncestors(element); }).reverse();
    var ancestorIndex = getLastMatchingIndex.apply(void 0, reversedAncestorLists);
    return reversedAncestorLists[0][ancestorIndex];
}
export { getCommonOffsetAncestor };
//# sourceMappingURL=get-common-offset-ancestor.js.map