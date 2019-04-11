import { Scroll } from '../../../cached-vectors/scroll';
import { getStyle } from '../../style/get-style';
import { Vector2d } from "../../../math/geometry/vector-2d";
var scroll = Scroll.getSingleton();
function getVisibleDistanceFromRoot_(element) {
    var candidateElement = element;
    var x = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (getStyle(candidateElement, 'position') === 'fixed') {
            return x + candidateElement.offsetLeft;
        }
        var transformVector = Vector2d.fromElementTransform(candidateElement);
        x +=
            candidateElement.offsetLeft +
                transformVector.x -
                candidateElement.scrollLeft;
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return x + invertedScroll.x;
}
function getVisibleDistanceFromRoot(element) {
    if (getStyle(element, 'position') === 'fixed') {
        return element.offsetLeft;
    }
    return element.offsetLeft +
        Vector2d.fromElementTransform(element).x +
        getVisibleDistanceFromRoot_(element.offsetParent);
}
export { getVisibleDistanceFromRoot };
//# sourceMappingURL=get-visible-distance-from-root.js.map