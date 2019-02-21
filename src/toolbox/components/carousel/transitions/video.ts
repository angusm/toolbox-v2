import {ICarousel, ITransition} from '../interfaces';
import {renderLoop} from '../../../utils/render-loop';
import {getMostVisibleElement} from "../../../utils/dom/position/get-most-visible-element";

class Video implements ITransition {
  readonly transitionTime_: number;
  readonly video_: HTMLVideoElement;
  private transitionTargets_: Map<ICarousel, HTMLElement>;

  constructor(video: HTMLVideoElement, transitionPoint: number) {
    this.transitionTargets_ = new Map();
    this.transitionTime_ = transitionPoint;
    this.video_ = video;
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
    const timeToTransition =
      Math.abs(this.video_.currentTime * 1000 - this.transitionTime_);
    this.video_.play();
    if (timeToTransition < renderLoop.getMsPerFrame()) {
      renderLoop.mutate(() => {
        carousel.getSlides()
          .forEach((slide: HTMLElement) => slide.style.opacity = '0');
        targetSlide.style.opacity = '1';
      });
    }
  }

  public hasTransitionedTo(slide: HTMLElement, carousel: ICarousel): boolean {
    return slide === null || slide.style.opacity === '1';
  }

  public renderLoop(carousel: ICarousel) {}
}

export {Video};
