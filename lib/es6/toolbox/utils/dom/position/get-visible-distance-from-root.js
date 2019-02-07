import { Scroll } from '../../cached-vectors/scroll';
import { Vector2d } from '../../math/geometry/vector-2d';
import { getStyle } from "../style/get-style";
var scroll = Scroll.getSingleton();
function getVisibleDistanceFromRoot_(element) {
    if (!element || element === document.body) {
        return scroll.getPosition().invert();
    }
    else if (getStyle(element, 'position') === 'fixed') {
        return Vector2d.fromElementOffset(element);
    }
    else {
        return Vector2d.add(Vector2d.fromElementOffset(element), Vector2d.fromElementTransform(element), Vector2d.fromElementScroll(element).invert(), getVisibleDistanceFromRoot_(element.offsetParent));
    }
}
function getVisibleDistanceFromRoot(element) {
    if (getStyle(element, 'position') === 'fixed') {
        return Vector2d.fromElementOffset(element);
    }
    return Vector2d.add(Vector2d.fromElementOffset(element), Vector2d.fromElementTransform(element), getVisibleDistanceFromRoot_(element.offsetParent));
}
export { getVisibleDistanceFromRoot };
//# sourceMappingURL=get-visible-distance-from-root.js.map