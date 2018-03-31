const renderLoop = require('../../utils/render-loop');

const DEFAULT_INTERVAL = 5000;

class CarouselTimer {
  constructor(carousel, interval = DEFAULT_INTERVAL) {
    this.carousel_ = carousel;
    this.interval_ = interval;
    this.lastActionTime_ = new Date();
    this.init_();
  }

  init_() {
    this.startTimeout_();
  }

  startTimeout_() {
    renderLoop.measure(() => {
      if (+new Date() > +this.lastActionTime_ + this.interval_) {
        this.carousel_.next();
      }
      if (!this.carousel_.isIdle()) {
        this.lastActionTime_ = new Date();
      }
      renderLoop.mutate(() => this.startTimeout_());
    });
  }
}

module.exports = CarouselTimer;
