import {Vector2d} from '../../math/geometry/vector-2d';
import {ZERO_VECTOR_2D} from "../../math/geometry/zero-vector-2d";

function getOffsetFromAncestor(
  element: HTMLElement, ancestor: HTMLElement
): Vector2d {
  if (!element || element === ancestor) {
    return ZERO_VECTOR_2D;
  } else {
    return Vector2d.fromElementOffset(element)
      .add(getOffsetFromAncestor(<HTMLElement>element.offsetParent, ancestor));
  }
}

export {getOffsetFromAncestor};
