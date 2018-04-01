import { getCommonOffsetAncestor } from './get-common-offset-ancestor';
import { getOffsetFromAncestor } from './get-offset-from-ancestor';
function getOffsetBetweenElements(a, b) {
    var commonAncestor = getCommonOffsetAncestor(a, b);
    return getOffsetFromAncestor(a, commonAncestor)
        .subtract(getOffsetFromAncestor(b, commonAncestor));
}
export { getOffsetBetweenElements };
//# sourceMappingURL=get-offset-between-elements.js.map