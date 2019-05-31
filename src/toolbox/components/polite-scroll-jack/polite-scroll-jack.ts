import {Carousel} from "../carousel/carousel";
import {onDomContentLoad} from "../../utils/dom/on-dom-content-load";
import {renderLoop} from "../../utils/render-loop";
import {SCROLL_ELEMENT} from "../../utils/dom/position/scroll-element";
import {ISmoothScrollServiceOptions} from "../smooth-scroll/i-smooth-scroll-service-options";
import {SmoothScrollService} from "../smooth-scroll/smooth-scroll-service";
import {isFullyVisible} from "../../utils/dom/position/is-fully-visible";
import {Scroll} from "../../utils/cached-vectors/scroll";
import {getSign} from "../../utils/math/get-sign";
import {getVisibleDistanceBetweenElementCenters} from "../../utils/dom/position/vertical/get-visible-distance-between-element-centers";
import {getVisibleDistanceBetweenElementBottoms} from "../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms";
import {getVisibleDistanceBetweenElements} from "../../utils/dom/position/vertical/get-visible-distance-between-elements";
import {getStuckDistance} from "../../utils/dom/position/vertical/get-stuck-distance";
import {intersect} from "../../utils/array/intersection";
import {getVisibleDistanceFromRootIfUnstuck} from "../../utils/dom/position/vertical/get-visible-distance-from-root-if-unstuck";
import {min} from "../../utils/array/min";
import {isFillingVisibleHeightIfUnstuck} from "../../utils/dom/position/vertical/is-filling-visible-height-if-unstuck";
import {isFullyVisibleIfUnstuck} from "../../utils/dom/position/vertical/is-fully-visible-if-unstuck";
import {getVisibleHeightIfUnstuck} from "../../utils/dom/position/vertical/get-visible-height-if-unstuck";
import {isVisibleIfUnstuck} from "../../utils/dom/position/vertical/is-visible-if-unstuck";

const scroll = Scroll.getSingleton();

enum TargetPosition {
  BOTTOM,
  CENTER,
  NONE,
  TOP,
}

// Handles nested scroll-jack coordinators
class PoliteScrollJackCoordinator {
  private static singleton_: PoliteScrollJackCoordinator;

  private scrollJackCount_: number;

  constructor() {
    this.scrollJackCount_ = 0;
  }

  public static getSingleton(): PoliteScrollJackCoordinator {
    return this.singleton_ = this.singleton_ || new this();
  }

  public scrollJack() {
    this.scrollJackCount_++;
  }

  public stopScrollJack() {
    if (this.scrollJackCount_ === 0) {
      throw new Error(
        'Attempting to stop scroll jacking more time than it has been started');
    } else {
      this.scrollJackCount_--;
    }
  }

  public isScrollJacking() {
    return this.scrollJackCount_ > 0;
  }
}

const politeScrollJackCoordinator = PoliteScrollJackCoordinator

class ActiveSlide {
  private readonly slide_: HTMLElement;
  private readonly position_: TargetPosition;

  constructor(slide: HTMLElement, position: TargetPosition) {
    this.slide_ = slide;
    this.position_ = position;
  }

  getPosition(): TargetPosition {
    return this.position_;
  }

  getSlide(): HTMLElement {
    return this.slide_;
  }
}

interface IPoliteScrollJackOptions {
  delay?: number,
  scrollContainer?: HTMLElement,
  smoothScrollConfig?: ISmoothScrollServiceOptions,
}

class PoliteScrollJack {
  private readonly carousel_: Carousel;
  private readonly container_: HTMLElement;
  private readonly smoothScrollService_: SmoothScrollService;
  private readonly delay_: number;
  private readonly scrollJackCallback_: () => void;
  private readonly scrollContainer_: HTMLElement;

  private destroyed_: boolean;
  private scrollJackTimeout_: number;
  private lastActiveSlide_: ActiveSlide;
  private lastScrollDelta_: number;
  private scrollJackDisabled_: boolean;

  constructor(
    container: HTMLElement,
    slides: HTMLElement[],
    {
      delay = 200,
      scrollContainer = null,
      smoothScrollConfig = {},
    }: IPoliteScrollJackOptions = {}
  ) {
    this.scrollContainer_ = scrollContainer;
    this.carousel_ = new Carousel(container, slides, {allowLooping: false});
    this.container_ = container;
    this.scrollJackTimeout_ = null;
    this.delay_ = delay;
    this.scrollJackCallback_ = () => this.scrollJack_();
    this.lastActiveSlide_ = null;
    this.lastScrollDelta_ = 0;

    this.scrollJackDisabled_ = false;

    const elementToScroll =
      scrollContainer === null ? SCROLL_ELEMENT : scrollContainer;
    this.smoothScrollService_ =
      elementToScroll === SCROLL_ELEMENT ?
        SmoothScrollService.getSingleton() :
        new SmoothScrollService(elementToScroll, smoothScrollConfig);
  }

  public static fireAndForget(
    container: HTMLElement,
    slides: HTMLElement[],
    options: IPoliteScrollJackOptions = {}
  ): PoliteScrollJack {
    const politeScrollJack = new PoliteScrollJack(container, slides, options);
    const _ignoredPromise = onDomContentLoad(() => politeScrollJack.init());
    return politeScrollJack;
  }

  public init(): void {
    renderLoop.anyMeasure(() => {
      renderLoop.anyCleanup(() => this.renderLoop_());
    });
  }

  private scrollJack_(): void {
    renderLoop.measure(() => {
      const amount = this.getScrollAmount_();
      if (amount !== 0 && !this.scrollJackDisabled_) {
        this.smoothScrollService_.scrollYByAmount(amount);
      }
    });
  }

  private getScrollAmount_(): number {
    const mostActiveSlide = this.getNextActiveSlide_();
    const targetPosition = mostActiveSlide.getPosition();
    const activeSlide = mostActiveSlide.getSlide();

    const stuckDistance = getStuckDistance(activeSlide);

    if (targetPosition === TargetPosition.TOP) {
      return getVisibleDistanceBetweenElements(
        activeSlide, this.scrollContainer_) - stuckDistance;
    } else if (targetPosition === TargetPosition.BOTTOM) {
      return getVisibleDistanceBetweenElementBottoms(
        activeSlide, this.scrollContainer_) - stuckDistance;
    } else if (targetPosition === TargetPosition.CENTER) {
      return getVisibleDistanceBetweenElementCenters(
        activeSlide, this.scrollContainer_) - stuckDistance;
    } else {
      return 0;
    }
  }

  private getActiveSlideFromCandidates_(
    candidateElements: HTMLElement[]
  ): HTMLElement {
    const currentActiveSlideIndex = this.carousel_.getActiveSlideIndex();
    return min(
      candidateElements,
      (candidateElement) => {
        if (isFullyVisibleIfUnstuck(candidateElement)) {
          return 0;
        } else {
          return window.innerHeight -
            getVisibleHeightIfUnstuck(candidateElement);
        }
      },
      (candidateElement) => {
        return Math.abs(
          currentActiveSlideIndex -
          this.carousel_.getSlideIndex(candidateElement));
      });
  }

  private getActiveSlideBasedOnScroll_(
    includeCurrentActiveSlide = false
  ): HTMLElement {
    const currentActiveSlide = this.carousel_.getActiveSlide();
    const scrollDeltaSign = getSign(this.lastScrollDelta_);
    const isScrollingDown = scrollDeltaSign === -1;

    if (
      isFillingVisibleHeightIfUnstuck(currentActiveSlide) &&
      getVisibleDistanceFromRootIfUnstuck(currentActiveSlide) !== 0
    ) {
      return currentActiveSlide;
    }

    if (scrollDeltaSign === 0) {
      return currentActiveSlide;
    }

    const visibleSlides =
      this.carousel_.getSlides()
        .filter((slide) => isVisibleIfUnstuck(slide, this.scrollContainer_));

    // If no slides are visible, return the active slide
    if (visibleSlides.length === 0) {
      return currentActiveSlide;
    }

    // Get elements in the last scrolled direction
    let elementsInTheRightDirection: HTMLElement[];
    if (isScrollingDown) {
      elementsInTheRightDirection =
        this.carousel_.getSlidesAfter(currentActiveSlide);
      if (includeCurrentActiveSlide) {
        elementsInTheRightDirection.unshift(currentActiveSlide);
      }
    } else {
      elementsInTheRightDirection =
        this.carousel_.getSlidesBefore(currentActiveSlide);
      if (includeCurrentActiveSlide) {
        elementsInTheRightDirection.push(currentActiveSlide);
      }
    }

    if (elementsInTheRightDirection.length === 0) {
      return currentActiveSlide;
    }

    const candidateElements =
      intersect(visibleSlides, elementsInTheRightDirection);

    if (candidateElements.length === 0) {
      return currentActiveSlide;
    }

    return this.getActiveSlideFromCandidates_(candidateElements);
  }

  private getNextActiveSlide_(): ActiveSlide {
    const currentActiveSlide = this.carousel_.getActiveSlide();
    const activeElement = this.getActiveSlideBasedOnScroll_(false);

    const scrollDeltaSign = getSign(this.lastScrollDelta_);
    const isScrollingDown = scrollDeltaSign === -1;

    let position;

    if (activeElement === currentActiveSlide) {
      if (isFillingVisibleHeightIfUnstuck(activeElement)) {
        position = TargetPosition.NONE;
      } else {
        const totalVisibleHeight =
          this.carousel_.getSlides().reduce(
            (result, slide) => result + getVisibleHeightIfUnstuck(slide), 0);
        if (totalVisibleHeight >= window.innerHeight) {
          position = TargetPosition.TOP;
        } else {
          position = TargetPosition.NONE;
        }
      }
    } else if (isFullyVisible(activeElement, this.scrollContainer_)) {
      position = TargetPosition.CENTER;
    } else if (isScrollingDown) {
      position = TargetPosition.TOP;
    } else {
      if (activeElement.offsetHeight >= window.innerHeight) {
        position = TargetPosition.BOTTOM;
      } else {
        position = TargetPosition.TOP;
      }
    }

    return new ActiveSlide(activeElement, position);
  }

  private renderLoop_(): void {
    // Since we're using any, we need to be careful about clashing between
    // scroll and animation.
    if (this.destroyed_) {
      return;
    }

    renderLoop.scrollMeasure(() => {
      this.lastScrollDelta_ = scroll.getDelta().y;
      window.clearTimeout(this.scrollJackTimeout_);

      if (!this.smoothScrollService_.isScrolling()) {
        this.scrollJackTimeout_ =
          window.setTimeout(this.scrollJackCallback_, this.delay_);
      }

      this.carousel_.transitionToSlide(this.getActiveSlideBasedOnScroll_(true));

      renderLoop.scrollCleanup(() => this.renderLoop_());
    });
  }

  public destroy() {
    this.destroyed_ = true;
  }

  public getCarousel(): Carousel {
    return this.carousel_;
  }

  public isScrollJackEnabled(): boolean {
    return this.scrollJackDisabled_;
  }

  public disableScrollJack(): void {
    this.scrollJackDisabled_ = true;
  }

  public enableScrollJack(): void {
    this.scrollJackDisabled_ = false;
  }
}

export {PoliteScrollJack}
