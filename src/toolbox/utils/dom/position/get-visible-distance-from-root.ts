import {Scroll} from '../../cached-vectors/scroll';
import {Vector2d} from '../../math/geometry/vector-2d';
import {getStyle} from "../style/get-style";

const scroll: Scroll = Scroll.getSingleton();

function getVisibleDistanceFromRoot_(element: HTMLElement): Vector2d {
  if (!element || element === document.body) {
    return scroll.getPosition().invert();
  } else if (getStyle(element, 'position') === 'fixed') {
    return Vector2d.fromElementOffset(element);
  } else {
    return Vector2d.add<Vector2d>(
      Vector2d.fromElementOffset(element),
      Vector2d.fromElementTransform(element),
      Vector2d.fromElementScroll(element).invert(),
      getVisibleDistanceFromRoot_(<HTMLElement>element.offsetParent));
  }
}

function getVisibleDistanceFromRoot(element: HTMLElement): Vector2d {
  if (getStyle(element, 'position') === 'fixed') {
    return Vector2d.fromElementOffset(element);
  }
  return Vector2d.add<Vector2d>(
    Vector2d.fromElementOffset(element),
    Vector2d.fromElementTransform(element),
    getVisibleDistanceFromRoot_(<HTMLElement>element.offsetParent));
}

export {getVisibleDistanceFromRoot};
