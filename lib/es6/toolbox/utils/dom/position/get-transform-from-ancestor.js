import { Vector2d } from '../../math/geometry/vector-2d';
import { ZERO_VECTOR_2D } from "../../math/geometry/zero-vector-2d";
function getTransformFromAncestor(element, ancestor) {
    if (!element || element === ancestor) {
        return ZERO_VECTOR_2D;
    }
    else {
        return Vector2d.fromElementTransform(element)
            .add(getTransformFromAncestor(element.offsetParent, ancestor));
    }
}
export { getTransformFromAncestor };
//# sourceMappingURL=get-transform-from-ancestor.js.map