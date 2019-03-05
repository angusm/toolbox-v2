import {ICarousel, ITransition} from '../interfaces';
import {renderLoop} from '../../../utils/render-loop';
import {getMostVisibleElement} from "../../../utils/dom/position/get-most-visible-element";
import {ArrayMap} from "../../../utils/map/array";
import {max} from "../../../utils/array/max";

class Video implements ITransition {
  private readonly activeSlides_: Map<ICarousel, HTMLElement>;
  private readonly transitionTargets_: ArrayMap<ICarousel, HTMLElement>;
  private readonly transitionTime_: number;
  private readonly video_: HTMLVideoElement;
  private shouldShift_: boolean;

  constructor(video: HTMLVideoElement, transitionPoint: number) {
    this.activeSlides_ = new Map();
    this.transitionTargets_ = new ArrayMap();
    this.transitionTime_ = transitionPoint;
    this.shouldShift_ = false;
    this.video_ = video;
  }

  public init(targetSlide: HTMLElement, carousel: ICarousel) {
    renderLoop.mutate(() => {
      carousel.getSlides()
        .forEach((slide: HTMLElement) => slide.style.opacity = '0');
      targetSlide.style.opacity = '1';
      this.activeSlides_.set(carousel, targetSlide);
    });
  }

  public getActiveSlide(carousel: ICarousel): HTMLElement {
    return this.activeSlides_.get(carousel);
  }

  public transition(targetSlide: HTMLElement, carousel: ICarousel) {
    const targets = this.transitionTargets_.get(carousel);

    // Reset video time if needed
    if (this.video_.currentTime === this.video_.duration) {
      this.video_.currentTime = 0;
      if (this.shouldShift_) {
        targets.shift();
        this.shouldShift_ = false;
      }
    }

    if (targets.slice(-1)[0] !== targetSlide) {
      targets.push(targetSlide);
    }
    const nextTarget = targets[0];
    const timeToTransition =
      this.video_.currentTime * 1000 - this.transitionTime_;
    this.video_.play();
    if (timeToTransition < renderLoop.getMsPerFrame()) {
      this.shouldShift_ = true;
      renderLoop.mutate(() => {
        carousel.getSlides()
          .filter((slide: HTMLElement) => slide !== nextTarget)
          .forEach((slide: HTMLElement) => slide.style.opacity = '0');
        nextTarget.style.opacity = '1';
        this.activeSlides_.set(carousel, nextTarget);
      });
    }
  }

  public hasTransitionedTo(targetSlide: HTMLElement, carousel: ICarousel): boolean {
    const mostVisibleSlide =
      max(
        carousel.getSlides(),
        (slide: HTMLElement) => parseFloat(slide.style.opacity));
    return targetSlide === mostVisibleSlide;
  }

  public renderLoop(carousel: ICarousel) {}
}

export {Video};
