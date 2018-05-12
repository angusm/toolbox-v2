import { Scroll } from '../../../cached-vectors/scroll';
import { Vector2d } from '../../../math/geometry/vector-2d';
import { frameMemoize } from '../../../frame-memoize';
import { getStyle } from "../../style/get-style";
var scroll = Scroll.getSingleton();
function getVisibleDistanceFromRoot__(element) {
    if (!element || element === document.body) {
        return -scroll.getPosition().y;
    }
    else if (getStyle(element, 'position') === 'fixed') {
        return element.offsetTop;
    }
    else {
        return element.offsetTop +
            Vector2d.fromElementTransform(element).y -
            element.scrollTop +
            memoized_(element.offsetParent);
    }
}
function getVisibleDistanceFromRoot_(element) {
    if (getStyle(element, 'position') === 'fixed') {
        return element.offsetTop;
    }
    return element.offsetTop +
        Vector2d.fromElementTransform(element).y +
        memoized_(element.offsetParent);
}
var memoized = frameMemoize(getVisibleDistanceFromRoot_);
var memoized_ = frameMemoize(getVisibleDistanceFromRoot__);
export { memoized as getVisibleDistanceFromRoot };
//# sourceMappingURL=get-visible-distance-from-root.js.map