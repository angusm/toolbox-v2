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
import {getVisibleDistanceFromRootIgnoringSticky} from "../../utils/dom/position/vertical/get-visible-distance-from-root-ignoring-sticky";
import {min} from "../../utils/array/min";
import {isFillingVisibleHeightIgnoringSticky} from "../../utils/dom/position/vertical/is-filling-visible-height-ignoring-sticky";
import {isFullyVisibleIgnoringSticky} from "../../utils/dom/position/vertical/is-fully-visible-ignoring-sticky";
import {getVisibleHeightIgnoringSticky} from "../../utils/dom/position/vertical/get-visible-height-ignoring-sticky";
import {isVisibleIgnoringSticky} from "../../utils/dom/position/vertical/is-visible-ignoring-sticky";
import {ICarouselOptions} from "../carousel/interfaces";
import {getParentElements} from "../../utils/dom/position/get-parent-elements";
import {contains} from "../../utils/array/contains";
import {DynamicDefaultMap} from "../../utils/map/dynamic-default";

enum TargetPosition {
  BOTTOM,
  CENTER,
  NONE,
  TOP,
}

// Handles nested scroll-jack coordinators
class PoliteScrollJackCoordinator {
  private static singleton_: PoliteScrollJackCoordinator;

  private readonly containerToInstance_: Map<HTMLElement, PoliteScrollJack>;
  private readonly ancestorsCache_: DynamicDefaultMap<HTMLElement, HTMLElement[]>;
  private readonly scroll_: Scroll;

  private sortedInstancesCache_: Array<PoliteScrollJack>;
  private lastScrollDelta_: number;
  private scrollJackTimeout_: number;
  private lastScrollJackTime_: number;

  constructor() {
    this.containerToInstance_ = new Map();
    this.ancestorsCache_ =
      DynamicDefaultMap.usingFunction(
        (element: HTMLElement) => getParentElements(element));
    this.lastScrollDelta_ = 0;
    this.scrollJackTimeout_ = null;
    this.lastScrollJackTime_ = 0;
    this.scroll_ = Scroll.getSingleton();
    this.runLoop_();
  }

  private clearCaches_(): void {
    this.ancestorsCache_.clear();
    this.sortedInstancesCache_ = [];
  }

  private getInstances_(): IterableIterator<PoliteScrollJack> {
    return this.containerToInstance_.values();
  }

  /**
   * Sorting instances ensures that nested carousel items have a chance to be
   * snapped to before large snaps are made.
   *
   * @private
   */
  private setupCaches_(): void {
    this.lastScrollDelta_ = this.scroll_.getDelta().getY();
    this.sortedInstancesCache_ =
      Array.from(this.getInstances_()).sort(
        (a: PoliteScrollJack, b: PoliteScrollJack) => {
          const aContainer = a.getContainer();
          const bContainer = b.getContainer();
          const aAncestors = this.ancestorsCache_.get(aContainer);
          const bAncestors = this.ancestorsCache_.get(bContainer);

          if (contains(aAncestors, bContainer)) {
            return -1;
          } else if (contains(bAncestors, aContainer)) {
            return 1;
          } else {
            return 0;
          }
        });
  }

  public getScrollDeltaSign(): number {
    return getSign(this.lastScrollDelta_);
  }

  public register(instance: PoliteScrollJack): void {
    this.containerToInstance_.set(instance.getContainer(), instance);
  }

  public deregister(instance: PoliteScrollJack): void {
    this.containerToInstance_.delete(instance.getContainer());
  }

  private runLoop_(): void {
    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => {
        this.clearCaches_();
        this.runLoop_();
      });

      this.setupCaches_();

      const isScrollJacking =
        this.sortedInstancesCache_
          .some((instance) => instance.isScrollJacking());
      if (isScrollJacking) {
        return; // Do nothing if we're already scroll jacking.
      }

      this.clearScrollJackTimeout_();
      const instanceToScrollAmount: Map<PoliteScrollJack, number> =
        this.sortedInstancesCache_.reduce(
          (map, instance) => {
            map.set(instance, instance.getScrollAmount());
            return map;
          },
          new Map());
      const instance =
        this.sortedInstancesCache_
          .find((instance) => instanceToScrollAmount.get(instance) !== 0);

      if (instance) {
        this.scrollJackTimeout_ =
          instance.scrollJack(instanceToScrollAmount.get(instance));
      }
    });
  }

  private clearScrollJackTimeout_(): void {
    window.clearTimeout(this.scrollJackTimeout_);
    this.scrollJackTimeout_ = null;
  }

  public static getSingleton(): PoliteScrollJackCoordinator {
    return this.singleton_ = this.singleton_ || new this();
  }
}

const politeScrollJackCoordinator = PoliteScrollJackCoordinator.getSingleton();

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
  carouselConfig?: ICarouselOptions,
}

class PoliteScrollJack {
  private readonly carousel_: Carousel;
  private readonly container_: HTMLElement;
  private readonly smoothScrollService_: SmoothScrollService;
  private readonly delay_: number;
  private readonly scrollContainer_: HTMLElement;

  private scrollJackEndTime_: number;
  private firstRun_: boolean;
  private disabled_: boolean;
  private lastActiveSlide_: ActiveSlide;
  private scrollJackDisabled_: boolean;

  constructor(
    container: HTMLElement,
    slides: HTMLElement[],
    {
      delay = 200,
      scrollContainer = null,
      smoothScrollConfig = {},
      carouselConfig =  {allowLooping: false},
    }: IPoliteScrollJackOptions = {}
  ) {
    this.scrollContainer_ = scrollContainer;
    this.carousel_ = new Carousel(container, slides, carouselConfig);
    this.container_ = container;
    this.delay_ = delay;
    this.lastActiveSlide_ = null;
    this.firstRun_ = true;
    this.scrollJackEndTime_ = 0;
    this.disabled_ = false;
    this.scrollJackDisabled_ = false;

    const elementToScroll =
      scrollContainer === null ? SCROLL_ELEMENT : scrollContainer;
    this.smoothScrollService_ =
      elementToScroll === SCROLL_ELEMENT ?
        SmoothScrollService.getSingleton() :
        new SmoothScrollService(elementToScroll, smoothScrollConfig);
  }

  public getContainer(): HTMLElement {
    return this.container_;
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
    politeScrollJackCoordinator.register(this);
    this.transitionLoop();
  }

  public scrollJack(amount: number): number {
    return window.setTimeout(
      () => {
        this.smoothScrollService_.scrollYByAmount(amount);
        this.scrollJackEndTime_ =
          performance.now() + this.smoothScrollService_.getDuration() + 200;
      }, this.delay_);
  }

  public isScrollJacking(): boolean {
    return this.smoothScrollService_.isScrolling() ||
      performance.now() <= this.scrollJackEndTime_;
  }

  public getScrollAmount(): number {
    // Don't do any scrolling if we're disabled.
    if (this.disabled_ || this.scrollJackDisabled_) {
      return 0;
    }

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
        if (isFullyVisibleIgnoringSticky(candidateElement)) {
          return 0;
        } else {
          return window.innerHeight -
            getVisibleHeightIgnoringSticky(candidateElement);
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
    const scrollDeltaSign = politeScrollJackCoordinator.getScrollDeltaSign();
    const isScrollingDown = scrollDeltaSign === -1;

    if (
      isFillingVisibleHeightIgnoringSticky(currentActiveSlide) &&
      getVisibleDistanceFromRootIgnoringSticky(currentActiveSlide) !== 0
    ) {
      return currentActiveSlide;
    }

    if (scrollDeltaSign === 0 && !this.firstRun_) {
      return currentActiveSlide;
    }

    const visibleSlides =
      this.carousel_.getSlides()
        .filter((slide) => isVisibleIgnoringSticky(slide, this.scrollContainer_));

    // If no slides are visible, return the active slide
    if (visibleSlides.length === 0) {
      return currentActiveSlide;
    }

    // Get elements in the last scrolled direction
    let elementsInTheRightDirection: HTMLElement[];
    if (this.firstRun_) {
      this.firstRun_ = false;
      elementsInTheRightDirection = this.carousel_.getSlides();
    } else if (isScrollingDown) {
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

    const scrollDeltaSign = politeScrollJackCoordinator.getScrollDeltaSign();
    const isScrollingDown = scrollDeltaSign === -1;

    let position;

    // Check if the container is offscreen
    const containerVisibleHeight =
      getVisibleHeightIgnoringSticky(this.container_, this.scrollContainer_);

    if (containerVisibleHeight < window.innerHeight) {
      position = TargetPosition.NONE
    } else if (activeElement === currentActiveSlide) {
      if (isFillingVisibleHeightIgnoringSticky(activeElement)) {
        position = TargetPosition.NONE;
      } else {
        position = TargetPosition.TOP;
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

  public transitionLoop(): void {
    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => this.transitionLoop());
      this.carousel_.transitionToSlide(this.getActiveSlideBasedOnScroll_(true));
    });
  }

  public destroy() {
    politeScrollJackCoordinator.deregister(this);
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

  public disable() {
    this.disabled_ = true;
  }

  public enableScrollJack(): void {
    this.scrollJackDisabled_ = false;
  }

  public enable() {
    this.disabled_ = false;
  }
}

export {PoliteScrollJack}
