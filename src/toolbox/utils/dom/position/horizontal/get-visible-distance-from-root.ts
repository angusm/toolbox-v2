import {Scroll} from '../../../cached-vectors/scroll';
import {getStyle} from '../../style/get-style';
import {Vector2d} from "../../../math/geometry/vector-2d";

const scroll: Scroll = Scroll.getSingleton();

function getVisibleDistanceFromRoot_(element: HTMLElement): number {
  let candidateElement: HTMLElement = element;
  let x = 0;

  while (candidateElement && candidateElement !== document.body) {
    // Special case for fixed elements
    if (getStyle(candidateElement, 'position') === 'fixed') {
      return x + candidateElement.offsetLeft;
    }

    const transformVector = Vector2d.fromElementTransform(candidateElement);

    x +=
      candidateElement.offsetLeft +
      transformVector.x -
      candidateElement.scrollLeft;

    candidateElement = <HTMLElement>candidateElement.offsetParent;
  }

  const invertedScroll = scroll.getPosition().invert();
  return x + invertedScroll.x;
}

function getVisibleDistanceFromRoot(element: HTMLElement): number {
  if (getStyle(element, 'position') === 'fixed') {
    return element.offsetLeft;
  }
  return  element.offsetLeft +
    Vector2d.fromElementTransform(element).x +
    getVisibleDistanceFromRoot_(<HTMLElement>element.offsetParent);
}

export {getVisibleDistanceFromRoot};
