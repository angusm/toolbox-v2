import {Scroll} from '../../cached-vectors/scroll';
import {Vector2d} from '../../math/geometry/vector-2d';
import {frameMemoize} from '../../frame-memoize';
import {getStyle} from "../style/get-style";

const scroll: Scroll = Scroll.getSingleton();
const ZERO_VECTOR: Vector2d = new Vector2d();

function getVisibleDistanceFromRoot_(element: HTMLElement): Vector2d {
  if (!element || element === document.body) {
    return ZERO_VECTOR;
  } else if (getStyle(element, 'position') === 'fixed') {
    return Vector2d.fromElementOffset(element) + scroll.getPosition().invert();
  } else {
    return Vector2d.add<Vector2d>(
      Vector2d.fromElementOffset(element),
      Vector2d.fromElementTransform(element),
      Vector2d.fromElementScroll(element).invert(),
      memoized(element.offsetParent));
  }
}

const memoized = frameMemoize(getVisibleDistanceFromRoot_);

export {memoized as getVisibleDistanceFromRoot};
