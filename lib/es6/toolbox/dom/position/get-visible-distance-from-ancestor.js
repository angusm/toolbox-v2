import { Scroll } from '../../cached-vectors/scroll';
import { Vector2d } from '../../math/geometry/vector-2d';
import { frameMemoize } from '../../frame-memoize';
var scroll = Scroll.getSingleton();
var memoized = frameMemoize(getVisibleDistanceFromAncestor_);
var memoized_ = frameMemoize(getVisibleDistanceFromAncestor__);
var ZERO_VECTOR = new Vector2d();
function getVisibleDistanceFromAncestor__(element, ancestor) {
    if (!element || element === document.body) {
        return ZERO_VECTOR;
    }
    else if (element === ancestor) {
        return Vector2d.fromElementScroll(element).invert();
    }
    else {
        return Vector2d.add(Vector2d.fromElementOffset(element), Vector2d.fromElementTransform(element), Vector2d.fromElementScroll(element).invert(), memoized_(element.offsetParent, ancestor));
    }
}
function getVisibleDistanceFromAncestor_(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    return Vector2d.add(ancestor ? ZERO_VECTOR : scroll.getPosition().invert(), Vector2d.fromElementScroll(element), memoized_(element, ancestor));
}
export { memoized as getVisibleDistanceFromAncestor };
//# sourceMappingURL=get-visible-distance-from-ancestor.js.map