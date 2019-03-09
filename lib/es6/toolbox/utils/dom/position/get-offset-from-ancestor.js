import { Vector2d } from '../../math/geometry/vector-2d';
import { ZERO_VECTOR_2D } from "../../math/geometry/zero-vector-2d";
function getOffsetFromAncestor(element, ancestor) {
    if (!element || element === ancestor) {
        return ZERO_VECTOR_2D;
    }
    else {
        return Vector2d.fromElementOffset(element)
            .add(getOffsetFromAncestor(element.offsetParent, ancestor));
    }
}
export { getOffsetFromAncestor };
//# sourceMappingURL=get-offset-from-ancestor.js.map