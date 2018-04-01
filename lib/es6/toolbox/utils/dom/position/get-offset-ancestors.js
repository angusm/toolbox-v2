import { frameMemoize } from '../../frame-memoize';
var getOffsetAncestors = frameMemoize(getOffsetAncestors_);
function getOffsetAncestors_(element, terminusAncestor) {
    if (terminusAncestor === void 0) { terminusAncestor = null; }
    if (!element || element === terminusAncestor) {
        return [];
    }
    return [element].concat(getOffsetAncestors(element.offsetParent, terminusAncestor));
}
export { getOffsetAncestors };
//# sourceMappingURL=get-offset-ancestors.js.map