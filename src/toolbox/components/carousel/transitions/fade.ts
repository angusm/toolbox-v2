import {ICarousel, ITransition} from '../interfaces';
import {getOpacity} from '../../../utils/dom/style/get-opacity';
import {renderLoop} from '../../../utils/render-loop';
import {getMostVisibleElement} from "../../../utils/dom/position/get-most-visible-element";

class Fade implements ITransition {
  private readonly step_: number;

  constructor(step: number = 0.1) {
    this.step_ = step;
  }

  public init(targetSlide: HTMLElement, carousel: ICarousel) {
    renderLoop.mutate(() => {
      carousel.getSlides()
        .forEach((slide: HTMLElement) => slide.style.opacity = '0');
      targetSlide.style.opacity = '1';
    });
  }

  public getActiveSlide(carousel: ICarousel): HTMLElement {
    return getMostVisibleElement(
      carousel.getSlides(), carousel.getContainer(), true);
  }

  public transition(targetSlide: HTMLElement, carousel: ICarousel) {
    const slidesToFade =
      carousel.getSlides().filter((slide) => slide !== targetSlide);
    renderLoop.measure(() => {
      const opacity = getOpacity(targetSlide) + this.step_;
      renderLoop.mutate(
        () => targetSlide.style.opacity = '' + Math.min(1, opacity));
      slidesToFade.forEach((slide) => {
        const opacity = getOpacity(slide) - this.step_;
        renderLoop.mutate(
          () => slide.style.opacity = '' + Math.max(0, opacity));
      });
    });
  }

  public hasTransitionedTo(slide: HTMLElement, carousel: ICarousel): boolean {
    return slide === null || slide.style.opacity === '1';
  }

  public renderLoop(carousel: ICarousel) {}
}

export {Fade};
