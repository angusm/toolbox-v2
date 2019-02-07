import { Vector2d } from '../../math/geometry/vector-2d';
function getTransformFromAncestor(element, ancestor) {
    if (!element || element === ancestor) {
        return new Vector2d(0, 0);
    }
    else {
        return Vector2d.fromElementTransform(element)
            .add(getTransformFromAncestor(element.offsetParent, ancestor));
    }
}
export { getTransformFromAncestor };
//# sourceMappingURL=get-transform-from-ancestor.js.map