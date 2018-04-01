import { Vector2d } from '../../math/geometry/vector-2d';
import { frameMemoize } from '../../frame-memoize';
var getOffsetFromAncestor = frameMemoize(getOffsetFromAncestor_);
function getOffsetFromAncestor_(element, ancestor) {
    if (!element || element === ancestor) {
        return new Vector2d(0, 0);
    }
    else {
        return Vector2d.fromElementOffset(element)
            .add(getOffsetFromAncestor(element.offsetParent, ancestor));
    }
}
export { getOffsetFromAncestor };
//# sourceMappingURL=get-offset-from-ancestor.js.map