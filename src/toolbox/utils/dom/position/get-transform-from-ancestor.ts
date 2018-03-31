import {Vector2d} from '../../math/geometry/vector-2d';
import {frameMemoize} from '../../frame-memoize';

const memoized: (element: HTMLElement, ancestor: HTMLElement) => Vector2d =
  frameMemoize(getTransformFromAncestor_);

function getTransformFromAncestor_(
  element: HTMLElement, ancestor: HTMLElement
): Vector2d {
  if (!element || element === ancestor) {
    return new Vector2d(0, 0);
  } else {
    return Vector2d.fromElementTransform(element)
      .add(memoized(<HTMLElement>element.offsetParent, ancestor));
  }
}

export {memoized as getTransformFromAncestor};
