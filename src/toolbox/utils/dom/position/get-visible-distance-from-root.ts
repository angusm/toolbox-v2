import {Scroll} from '../../cached-vectors/scroll';
import {Vector2d} from '../../math/geometry/vector-2d';
import {getStyle} from '../style/get-style';

const scroll: Scroll = Scroll.getSingleton();

function getVisibleDistanceFromRoot_(element: HTMLElement): Vector2d {
  let candidateElement: HTMLElement = element;
  let x = 0;
  let y = 0;

  while (candidateElement && candidateElement !== document.body) {
    // Special case for fixed elements
    if (getStyle(candidateElement, 'position') === 'fixed') {
      return new Vector2d(
        x + candidateElement.offsetLeft,
        y + candidateElement.offsetTop);
    }

    const transformVector = Vector2d.fromElementTransform(candidateElement);

    x +=
      candidateElement.offsetLeft +
      transformVector.x -
      candidateElement.scrollLeft;

    y +=
      candidateElement.offsetTop +
      transformVector.y -
      candidateElement.scrollTop;

    candidateElement = <HTMLElement>candidateElement.offsetParent;
  }

  const invertedScroll = scroll.getPosition().invert();
  return new Vector2d(x + invertedScroll.x, y + invertedScroll.y);
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
