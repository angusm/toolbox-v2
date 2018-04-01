import { Vector2d } from '../../math/geometry/vector-2d';
import { frameMemoize } from '../../frame-memoize';
var memoized = frameMemoize(getTransformFromAncestor_);
function getTransformFromAncestor_(element, ancestor) {
    if (!element || element === ancestor) {
        return new Vector2d(0, 0);
    }
    else {
        return Vector2d.fromElementTransform(element)
            .add(memoized(element.offsetParent, ancestor));
    }
}
export { memoized as getTransformFromAncestor };
//# sourceMappingURL=get-transform-from-ancestor.js.map