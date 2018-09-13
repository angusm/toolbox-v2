import {Scroll} from '../../../cached-vectors/scroll';
import {Vector2d} from '../../../math/geometry/vector-2d';
import {getStyle} from "../../style/get-style";

const scroll: Scroll = Scroll.getSingleton();

function getVisibleDistanceFromRoot_(element: HTMLElement): number {
  if (!element || element === document.body) {
    return -scroll.getPosition().y;
  } else if (getStyle(element, 'position') === 'fixed') {
    return element.offsetTop;
  } else {
    return element.offsetTop +
      Vector2d.fromElementTransform(element).y -
      element.scrollTop +
      getVisibleDistanceFromRoot_(<HTMLElement>element.offsetParent);
  }
}

function getVisibleDistanceFromRoot(element: HTMLElement): number {
  if (getStyle(element, 'position') === 'fixed') {
    return element.offsetTop;
  }
  return element.offsetTop +
    Vector2d.fromElementTransform(element).y +
    getVisibleDistanceFromRoot_(<HTMLElement>element.offsetParent);
}

export {getVisibleDistanceFromRoot};
