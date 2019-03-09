import { Scroll } from '../../../cached-vectors/scroll';
import { Vector2d } from '../../../math/geometry/vector-2d';
import { getStyle } from "../../style/get-style";
var scroll = Scroll.getSingleton();
function getVisibleDistanceFromRoot_(element) {
    var candidateElement = element;
    var y = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (getStyle(candidateElement, 'position') === 'fixed') {
            return y + candidateElement.offsetTop;
        }
        else {
            y +=
                candidateElement.offsetTop +
                    Vector2d.fromElementTransform(element).y -
                    candidateElement.scrollTop;
        }
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return y + invertedScroll.y;
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