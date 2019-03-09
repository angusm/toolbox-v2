import { Scroll } from '../../cached-vectors/scroll';
import { Vector2d } from '../../math/geometry/vector-2d';
import { getStyle } from "../style/get-style";
var scroll = Scroll.getSingleton();
function getVisibleDistanceFromRoot_(element) {
    var candidateElement = element;
    var x = 0;
    var y = 0;
    while (candidateElement && candidateElement !== document.body) {
        if (getStyle(candidateElement, 'position') === 'fixed') {
            return new Vector2d(x + candidateElement.offsetLeft, y + candidateElement.offsetTop);
        }
        var transformVector = Vector2d.fromElementTransform(candidateElement);
        x +=
            candidateElement.offsetLeft +
                transformVector.x -
                candidateElement.scrollLeft;
        y +=
            candidateElement.offsetTop +
                transformVector.y -
                candidateElement.scrollTop;
        candidateElement = candidateElement.offsetParent;
    }
    var invertedScroll = scroll.getPosition().invert();
    return new Vector2d(x + invertedScroll.x, y + invertedScroll.y);
}
function getVisibleDistanceFromRoot(element) {
    if (getStyle(element, 'position') === 'fixed') {
        return Vector2d.fromElementOffset(element);
    }
    return Vector2d.add(Vector2d.fromElementOffset(element), Vector2d.fromElementTransform(element), getVisibleDistanceFromRoot_(element.offsetParent));
}
export { getVisibleDistanceFromRoot };
//# sourceMappingURL=get-visible-distance-from-root.js.map