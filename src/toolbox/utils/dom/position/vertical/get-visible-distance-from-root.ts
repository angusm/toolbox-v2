import {Scroll} from '../../../cached-vectors/scroll';
import {Vector2d} from '../../../math/geometry/vector-2d';
import {getStyle} from "../../style/get-style";

const scroll: Scroll = Scroll.getSingleton();

function getVisibleDistanceFromRoot_(element: HTMLElement): number {
  let candidateElement = element;
  let y = 0;

  while (candidateElement && candidateElement !== document.body) {
    // Special case for fixed elements
    if (getStyle(candidateElement, 'position') === 'fixed') {
      return y + candidateElement.offsetTop;
    } else {
      y +=
        candidateElement.offsetTop +
        Vector2d.fromElementTransform(element).y -
        candidateElement.scrollTop;
    }

    candidateElement = <HTMLElement>candidateElement.offsetParent;
  }

  const invertedScroll = scroll.getPosition().invert();
  return y + invertedScroll.y;
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
