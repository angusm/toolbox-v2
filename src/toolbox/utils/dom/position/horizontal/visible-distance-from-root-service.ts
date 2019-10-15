import {DynamicDefaultMap} from "../../../map/dynamic-default";
import {renderLoop} from "../../../render-loop";
import {Scroll} from '../../../cached-vectors/scroll';
import {getStyle} from '../../style/get-style';
import {Vector2d} from "../../../math/geometry/vector-2d";

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

  const invertedScroll = Scroll.getSingleton().getPosition().invert();
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

class VisibleDistanceFromRootService {
  private static singleton_: VisibleDistanceFromRootService = null;
  private cache_: DynamicDefaultMap<HTMLElement, number>;

  constructor() {
    this.cache_ =
      DynamicDefaultMap.usingFunction(
        (element: HTMLElement) => getVisibleDistanceFromRoot(element));
    this.init_();
  }

  private init_() {
    this.renderLoop_();
  }

  getVisibleDistanceFromRoot(element: HTMLElement): number {
    return this.cache_.get(element);
  }

  private renderLoop_() {
    renderLoop.anyMutate(() => {
      renderLoop.anyCleanup(() => {
        this.cache_.clear();
        this.renderLoop_();
      });
    });
  }

  public static getSingleton(): VisibleDistanceFromRootService {
    return this.singleton_ = this.singleton_ || new this();
  }
}

export {VisibleDistanceFromRootService};
