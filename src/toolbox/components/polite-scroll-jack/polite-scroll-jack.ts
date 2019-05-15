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
import {isVisible} from "../../utils/dom/position/is-visible";
import {isFillingVisibleArea} from "../../utils/dom/position/is-filling-visible-area";
import {getStuckDistance} from "../../utils/dom/position/vertical/get-stuck-distance";
import {intersect} from "../../utils/array/intersection";
import {getVisibleDistanceFromRootIfUnstuck} from "../../utils/dom/position/vertical/get-visible-distance-from-root-if-unstuck";
import {min} from "../../utils/array/min";

const scroll = Scroll.getSingleton();

enum TargetPosition {
  BOTTOM,
  CENTER,
  NONE,
  TOP,
}

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

    const elementToScroll =
      scrollContainer === null ? SCROLL_ELEMENT : scrollContainer;
    this.smoothScrollService_ =
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
      if (amount !== 0) {
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
    return min(
      candidateElements,
      (candidateElement) => {
        return Math.abs(
          getVisibleDistanceBetweenElementCenters(candidateElement) -
          getStuckDistance(candidateElement));
      });
  }

  private getCurrentActiveSlide_(): HTMLElement {
    const currentActiveSlide = this.carousel_.getActiveSlide();
    const scrollDeltaSign = getSign(this.lastScrollDelta_);
    const isScrollingDown = scrollDeltaSign === -1;

    const visibleSlides =
      this.carousel_.getSlides()
        .filter((slide) => isVisible(slide, this.scrollContainer_));

    // If no slides are visible, return the active slide
    if (visibleSlides.length === 0) {
      return currentActiveSlide;
    }

    // Get elements in the last scrolled direction
    const elementsInTheRightDirection: HTMLElement[] =
      isScrollingDown ?
        [
          currentActiveSlide,
          ...this.carousel_.getSlidesAfter(currentActiveSlide)] :
        [
          ...this.carousel_.getSlidesBefore(currentActiveSlide),
          currentActiveSlide];

    const candidateElements =
      intersect(visibleSlides, elementsInTheRightDirection);

    return this.getActiveSlideFromCandidates_(candidateElements) ||
      currentActiveSlide;
  }

  private getNextActiveSlide_(): ActiveSlide {
    const currentActiveSlide = this.carousel_.getActiveSlide();
    const scrollDeltaSign = getSign(this.lastScrollDelta_);
    const isScrollingDown = scrollDeltaSign === -1;

    if (scrollDeltaSign === 0) {
      return new ActiveSlide(currentActiveSlide, TargetPosition.NONE);
    }

    const visibleSlides =
      this.carousel_.getSlides()
        .filter((slide) => isVisible(slide, this.scrollContainer_));

    // If no slides are visible, return the active slide
    if (visibleSlides.length === 0) {
      return new ActiveSlide(currentActiveSlide, TargetPosition.NONE);
    }

    // Get elements in the last scrolled direction
    let elementsInTheRightDirection: HTMLElement[] =
      isScrollingDown ?
        this.carousel_.getSlidesAfter(currentActiveSlide) :
        this.carousel_.getSlidesBefore(currentActiveSlide);

    if (elementsInTheRightDirection.length === 0) {
      return new ActiveSlide(currentActiveSlide, TargetPosition.NONE);
    }

    const candidateElements =
      intersect(visibleSlides, elementsInTheRightDirection);

    const activeElement =
      this.getActiveSlideFromCandidates_(candidateElements) ||
      currentActiveSlide;

    let position;
    if (isFullyVisible(activeElement, this.scrollContainer_)) {
      position = TargetPosition.CENTER;
    } else if (this.lastScrollDelta_ > 0) {
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

      this.carousel_.transitionToSlide(this.getCurrentActiveSlide_());

      renderLoop.scrollCleanup(() => this.renderLoop_());
    });
  }

  public destroy() {
    this.destroyed_ = true;
  }

  public getCarousel(): Carousel {
    return this.carousel_;
  }
}

export {PoliteScrollJack}
