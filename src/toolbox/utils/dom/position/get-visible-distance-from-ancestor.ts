import {Scroll} from '../../cached-vectors/scroll';
import {Vector2d} from '../../math/geometry/vector-2d';
import {frameMemoize} from '../../frame-memoize';

const scroll: Scroll = Scroll.getSingleton<Scroll>();
const memoized = frameMemoize(getVisibleDistanceFromAncestor_);
const memoized_ = frameMemoize(getVisibleDistanceFromAncestor__);
const ZERO_VECTOR: Vector2d = new Vector2d();

function getVisibleDistanceFromAncestor__(
  element: HTMLElement, ancestor: HTMLElement
): Vector2d {
  if (!element || element === document.body) {
    return ZERO_VECTOR;
  } else if (element === ancestor) {
    return Vector2d.fromElementScroll(element).invert();
  } else {
    return Vector2d.add<Vector2d>(
      Vector2d.fromElementOffset(element),
      Vector2d.fromElementTransform(element),
      Vector2d.fromElementScroll(element).invert(),
      memoized_(element.offsetParent, ancestor));
  }
}

function getVisibleDistanceFromAncestor_(
  element: HTMLElement, ancestor: HTMLElement = null
): Vector2d {
  return Vector2d.add<Vector2d>(
    ancestor ? ZERO_VECTOR : scroll.getPosition().invert(),
    Vector2d.fromElementScroll(element),
    memoized_(element, ancestor));
}

export {memoized as getVisibleDistanceFromAncestor};
