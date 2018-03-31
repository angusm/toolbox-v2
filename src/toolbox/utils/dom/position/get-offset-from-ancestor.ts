import {Vector2d} from '../../math/geometry/vector-2d';
import {frameMemoize} from '../../frame-memoize';

type GetOffsetFromAncestorSignature =
  (element: HTMLElement, ancestor: HTMLElement) => Vector2d;

const getOffsetFromAncestor: GetOffsetFromAncestorSignature =
  frameMemoize(getOffsetFromAncestor_);

function getOffsetFromAncestor_(
  element: HTMLElement, ancestor: HTMLElement
): Vector2d {
  if (!element || element === ancestor) {
    return new Vector2d(0, 0);
  } else {
    return Vector2d.fromElementOffset(element)
      .add(getOffsetFromAncestor(<HTMLElement>element.offsetParent, ancestor));
  }
}

export {getOffsetFromAncestor};
