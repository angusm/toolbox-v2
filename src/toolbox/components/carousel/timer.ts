import {renderLoop} from '../../utils/render-loop';
import {Carousel} from "./carousel";

const DEFAULT_INTERVAL: number = 5000;

class CarouselTimer {
  private readonly interval_: number;
  private readonly carousel_: Carousel;
  private lastActionTime_: number;

  constructor(carousel: Carousel, interval: number = DEFAULT_INTERVAL) {
    this.carousel_ = carousel;
    this.interval_ = interval;
    this.lastActionTime_ = new Date().valueOf();
    this.init_();
  }

  private init_(): void {
    this.startTimeout_();
  }

  private startTimeout_(): void {
    renderLoop.measure(() => {
      if (new Date().valueOf() > +this.lastActionTime_ + this.interval_) {
        this.carousel_.next();
      }
      if (!this.carousel_.isIdle()) {
        this.lastActionTime_ = new Date().valueOf();
      }
      renderLoop.mutate(() => this.startTimeout_());
    });
  }
}

export {CarouselTimer};
