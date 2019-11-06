import {Carousel} from "../carousel/carousel";
import {onDomContentLoad} from "../../utils/dom/on-dom-content-load";
import {renderLoop} from "../../utils/render-loop";
import {ICarouselOptions} from "../carousel/interfaces";
import {getMostVisibleElementIgnoringSticky} from "../../utils/dom/position/vertical/get-most-visible-element-ignoring-sticky";


interface IVerticalScrollCarouselOptions {
  scrollContainer?: HTMLElement,
  carouselConfig?: ICarouselOptions,
}

class VerticalScrollCarousel {
  private readonly carousel_: Carousel;
  private readonly scrollContainer_: HTMLElement;

  private destroyed_: boolean;
  private disabled_: boolean;

  constructor(
    container: HTMLElement,
    slides: HTMLElement[],
    {
      scrollContainer = null,
      carouselConfig =  {allowLooping: false},
    }: IVerticalScrollCarouselOptions = {}
  ) {
    this.scrollContainer_ = scrollContainer;
    this.carousel_ = new Carousel(container, slides, carouselConfig);
    this.destroyed_ = false;
    this.disabled_ = false;
  }


  public static fireAndForget(
    container: HTMLElement,
    slides: HTMLElement[],
    options: IVerticalScrollCarouselOptions = {}
  ): VerticalScrollCarousel {
    const instance = new VerticalScrollCarousel(container, slides, options);
    const _ignoredPromise = onDomContentLoad(() => instance.init());
    return instance;
  }

  public init(): void {
    this.scrollLoop_();
  }

  private scrollLoop_(): void {
    if (this.destroyed_) {
      return;
    }

    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => this.scrollLoop_());
      if (!this.disabled_) {
        this.updateActiveSlide_();
      }
    });
  }

  private updateActiveSlide_() {
    this.carousel_.transitionToSlide(
      getMostVisibleElementIgnoringSticky(
        this.carousel_.getSlides(), this.scrollContainer_));
  }

  public enable() {
    this.disabled_ = false;
    this.updateActiveSlide_();
  }

  public disable() {
    this.disabled_ = true;
  }

  public destroy() {
    this.destroyed_ = true;
  }

  public getCarousel(): Carousel {
    return this.carousel_;
  }
}

export {VerticalScrollCarousel}
