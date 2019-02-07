import { Vector2d } from '../../math/geometry/vector-2d';
function getOffsetFromAncestor(element, ancestor) {
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