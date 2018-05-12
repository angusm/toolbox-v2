import {Scroll} from '../../../cached-vectors/scroll';
import {Vector2d} from '../../../math/geometry/vector-2d';
import {frameMemoize} from '../../../frame-memoize';
import {getStyle} from "../../style/get-style";

const scroll: Scroll = Scroll.getSingleton();

function getVisibleDistanceFromRoot__(element: HTMLElement): number {
  if (!element || element === document.body) {
    return -scroll.getPosition().y;
  } else if (getStyle(element, 'position') === 'fixed') {
    return element.offsetTop;
  } else {
    return element.offsetTop +
      Vector2d.fromElementTransform(element).y -
      element.scrollTop +
      memoized_(element.offsetParent);
  }
}

function getVisibleDistanceFromRoot_(element: HTMLElement): number {
  if (getStyle(element, 'position') === 'fixed') {
    return element.offsetTop;
  }
  return element.offsetTop +
    Vector2d.fromElementTransform(element).y +
    memoized_(element.offsetParent);
}

const memoized = frameMemoize(getVisibleDistanceFromRoot_);
const memoized_ = frameMemoize(getVisibleDistanceFromRoot__);

export {memoized as getVisibleDistanceFromRoot};
