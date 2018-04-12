import { Scroll } from '../../cached-vectors/scroll';
import { Vector2d } from '../../math/geometry/vector-2d';
import { frameMemoize } from '../../frame-memoize';
import { getStyle } from "../style/get-style";
var scroll = Scroll.getSingleton();
var ZERO_VECTOR = new Vector2d();
function getVisibleDistanceFromRoot__(element) {
    if (getStyle(element, 'position') === 'fixed') {
        return Vector2d.fromElementOffset(element);
    }
    else if (!element || element === document.body) {
        return ZERO_VECTOR;
    }
    else {
        return Vector2d.add(Vector2d.fromElementOffset(element), Vector2d.fromElementTransform(element), Vector2d.fromElementScroll(element).invert(), memoized_(element.offsetParent));
    }
}
function getVisibleDistanceFromRoot_(element) {
    if (getStyle(element, 'position') === 'fixed') {
        return Vector2d.fromElementOffset(element);
    }
    return Vector2d.add(scroll.getPosition().invert(), Vector2d.fromElementScroll(element), memoized_(element));
}
var memoized = frameMemoize(getVisibleDistanceFromRoot_);
var memoized_ = frameMemoize(getVisibleDistanceFromRoot__);
export { memoized as getVisibleDistanceFromRoot };
//# sourceMappingURL=get-visible-distance-from-root.js.map