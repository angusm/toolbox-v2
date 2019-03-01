import {ICarousel, ITransition} from '../interfaces';

class CssClassesOnly implements ITransition {
  private activeSlides_: Map<ICarousel, HTMLElement>;
  constructor() {
    this.activeSlides_ = new Map();
  }

  public init(targetSlide: HTMLElement, carousel: ICarousel) {
    this.activeSlides_.set(carousel, targetSlide);
  }

  public getActiveSlide(carousel: ICarousel): HTMLElement {
    return this.activeSlides_.get(carousel);
  }

  public transition(targetSlide: HTMLElement, carousel: ICarousel) {
    this.activeSlides_.set(carousel, targetSlide);
  }

  public hasTransitionedTo(slide: HTMLElement, carousel: ICarousel): boolean {
    return this.activeSlides_.get(carousel) === slide;
  }

  public renderLoop(carousel: ICarousel) {}
}

export {CssClassesOnly};
