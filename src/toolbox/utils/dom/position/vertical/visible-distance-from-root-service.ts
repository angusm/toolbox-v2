import {DynamicDefaultMap} from "../../../map/dynamic-default";
import {renderLoop} from "../../../render-loop";
import {Scroll} from '../../../cached-vectors/scroll';
import {Vector2d} from '../../../math/geometry/vector-2d';
import {getStuckDistance} from "./get-stuck-distance";
import {isFixed} from "../is-fixed";

function getIgnoreStickyOffset_(candidateElement: HTMLElement): number {
  return getBasicOffset_(candidateElement) - getStuckDistance(candidateElement);
}

function getBasicOffset_(candidateElement: HTMLElement): number {
  return candidateElement.offsetTop +
    Vector2d.fromElementTransform(candidateElement).y;
}

function getVisibleDistanceFromRoot_(
  element: HTMLElement,
  getOffsetFn: (e: HTMLElement) => number,
): number {
  let candidateElement = element;
  let y = 0;

  while (candidateElement && candidateElement !== document.body) {
    // Special case for fixed elements
    if (isFixed(candidateElement)) {
      return y + candidateElement.offsetTop;
    } else {
      y += getOffsetFn(candidateElement) - candidateElement.scrollTop;
    }

    candidateElement = <HTMLElement>candidateElement.offsetParent;
  }

  const invertedScroll = Scroll.getSingleton().getPosition().invert();
  return y + invertedScroll.getY();
}

function getVisibleDistanceFromRoot(
  element: HTMLElement,
  getOffsetFn: (e: HTMLElement) => number,
): number {
  if (isFixed(element)) {
    return element.offsetTop;
  }
  return getOffsetFn(element) +
    getVisibleDistanceFromRoot_(<HTMLElement>element.offsetParent, getOffsetFn);
}

class VisibleDistanceFromRootService {
  private static singleton_: VisibleDistanceFromRootService = null;
  private cache_: DynamicDefaultMap<HTMLElement, number>;
  private cacheIgnoringSticky_: DynamicDefaultMap<HTMLElement, number>;

  constructor() {
    this.cache_ =
      DynamicDefaultMap.usingFunction(
        (element: HTMLElement) => {
          return getVisibleDistanceFromRoot(element, getBasicOffset_);
        });
    this.cacheIgnoringSticky_ =
      DynamicDefaultMap.usingFunction(
        (element: HTMLElement) => {
          return getVisibleDistanceFromRoot(element, getIgnoreStickyOffset_);
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
        this.clearCaches_();
        this.renderLoop_();
      });
    });
  }

  private clearCaches_() {
    this.cache_.clear();
    this.cacheIgnoringSticky_.clear();
  }

  public static getSingleton(): VisibleDistanceFromRootService {
    return this.singleton_ = this.singleton_ || new this();
  }
}

export {VisibleDistanceFromRootService};
