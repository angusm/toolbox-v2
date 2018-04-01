import {ICarousel} from '../interfaces';
import {Transition} from './base';
import {getOpacity} from '../../../utils/dom/style/get-opacity';
import {renderLoop} from '../../../utils/render-loop';

class Fade extends Transition {
  private step_: number;

  constructor(step: number = 0.1) {
    super();
    this.step_ = step;
  }

  init(targetSlide: HTMLElement, carousel: ICarousel) {
    renderLoop.mutate(() => {
      carousel.getSlides()
        .forEach((slide: HTMLElement) => slide.style.opacity = '0');
      targetSlide.style.opacity = '1';
    });
  }

  transition(targetSlide: HTMLElement, carousel: ICarousel) {
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
}

export {Fade};