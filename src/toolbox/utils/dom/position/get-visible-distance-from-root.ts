import {Scroll} from '../../cached-vectors/scroll';
import {Vector2d} from '../../math/geometry/vector-2d';
import {frameMemoize} from '../../frame-memoize';
import {getStyle} from "../style/get-style";

const scroll: Scroll = Scroll.getSingleton();
const ZERO_VECTOR: Vector2d = new Vector2d();

function getVisibleDistanceFromRoot__(element: HTMLElement): Vector2d {
  if (!element || element === document.body) {
    return ZERO_VECTOR;
  } else {
    return Vector2d.add<Vector2d>(
      Vector2d.fromElementOffset(element),
      Vector2d.fromElementTransform(element),
      Vector2d.fromElementScroll(element).invert(),
      memoized_(element.offsetParent));
  }
}

function getVisibleDistanceFromRoot_(element: HTMLElement): Vector2d {
  if (getStyle(element, 'position') === 'fixed') {
    return Vector2d.fromElementOffset(element);
  }
  return Vector2d.add<Vector2d>(
    scroll.getPosition().invert(),
    Vector2d.fromElementScroll(element),
    memoized_(element));
}

const memoized = frameMemoize(getVisibleDistanceFromRoot_);
const memoized_ = frameMemoize(getVisibleDistanceFromRoot__);

export {memoized as getVisibleDistanceFromRoot};
