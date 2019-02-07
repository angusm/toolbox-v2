import { Scroll } from '../../../cached-vectors/scroll';
import { Vector2d } from '../../../math/geometry/vector-2d';
import { getStyle } from "../../style/get-style";
var scroll = Scroll.getSingleton();
function getVisibleDistanceFromRoot_(element) {
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
            getVisibleDistanceFromRoot_(element.offsetParent);
    }
}
function getVisibleDistanceFromRoot(element) {
    if (getStyle(element, 'position') === 'fixed') {
        return element.offsetTop;
    }
    return element.offsetTop +
        Vector2d.fromElementTransform(element).y +
        getVisibleDistanceFromRoot_(element.offsetParent);
}
export { getVisibleDistanceFromRoot };
//# sourceMappingURL=get-visible-distance-from-root.js.map