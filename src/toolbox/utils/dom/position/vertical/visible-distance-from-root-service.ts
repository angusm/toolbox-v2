import {DynamicDefaultMap} from "../../../map/dynamic-default";
import {renderLoop} from "../../../render-loop";
import {Scroll} from '../../../cached-vectors/scroll';
import {Vector2d} from '../../../math/geometry/vector-2d';
import {getStyle} from "../../style/get-style";
import {getStuckDistance} from "./get-stuck-distance";

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

function getVisibleDistanceFromRootIgnoringSticky_(element: HTMLElement): number {
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
        candidateElement.scrollTop -
        getStuckDistance(element);
    }

    candidateElement = <HTMLElement>candidateElement.offsetParent;
  }

  const invertedScroll = scroll.getPosition().invert();
  return y + invertedScroll.y;
}

function getVisibleDistanceFromRootIgnoringSticky(
  element: HTMLElement
): number {
  if (getStyle(element, 'position') === 'fixed') {
    return element.offsetTop;
  }
  return element.offsetTop +
    Vector2d.fromElementTransform(element).y +
    getVisibleDistanceFromRootIgnoringSticky_(<HTMLElement>element.offsetParent);
}

class VisibleDistanceFromRootService {
  private static singleton_: VisibleDistanceFromRootService = null;
  private cache_: DynamicDefaultMap<HTMLElement, number>;
  private cacheIgnoringSticky_: DynamicDefaultMap<HTMLElement, number>;

  constructor() {
    this.cache_ =
      DynamicDefaultMap.usingFunction(
        (element: HTMLElement) => getVisibleDistanceFromRoot(element));
    this.cacheIgnoringSticky_ =
      DynamicDefaultMap.usingFunction(
        (element: HTMLElement) => {
          return getVisibleDistanceFromRootIgnoringSticky(element);
        });
    this.init_();
  }

  private init_() {
    this.renderLoop_();
  }

  getVisibleDistanceFromRoot(element: HTMLElement): number {
    return this.cache_.get(element);
  }

  getVisibleDistanceFromRootIgnoringSticky(element: HTMLElement): number {
    return this.cacheIgnoringSticky_.get(element);
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
