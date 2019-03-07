import { renderLoop } from '../../utils/render-loop';
var DEFAULT_INTERVAL = 5000;
var CarouselTimer = (function () {
    function CarouselTimer(carousel, interval) {
        if (interval === void 0) { interval = DEFAULT_INTERVAL; }
        this.carousel_ = carousel;
        this.interval_ = interval;
        this.lastActionTime_ = new Date().valueOf();
        this.paused_ = false;
        this.pausedOffset_ = 0;
        this.init_();
    }
    CarouselTimer.prototype.init_ = function () {
        this.startTimeout_();
    };
    CarouselTimer.prototype.startTimeout_ = function () {
        var _this = this;
        if (this.paused_ || this.destroyed_) {
            return;
        }
        renderLoop.measure(function () {
            if (new Date().valueOf() > +_this.lastActionTime_ + _this.interval_) {
                _this.carousel_.next();
            }
            if (!_this.carousel_.isIdle()) {
                _this.lastActionTime_ = new Date().valueOf();
            }
            renderLoop.mutate(function () { return _this.startTimeout_(); });
        });
    };
    CarouselTimer.prototype.pause = function () {
        if (this.paused_) {
            return;
        }
        this.paused_ = true;
        this.pausedOffset_ = new Date().valueOf() - this.lastActionTime_;
    };
    CarouselTimer.prototype.stop = function () {
        this.pause();
        this.pausedOffset_ = 0;
    };
    CarouselTimer.prototype.play = function () {
        if (!this.paused_) {
            return;
        }
        this.lastActionTime_ = new Date().valueOf() - this.pausedOffset_;
        this.paused_ = false;
        this.pausedOffset_ = 0;
        this.startTimeout_();
    };
    CarouselTimer.prototype.isPaused = function () {
        return this.paused_;
    };
    CarouselTimer.prototype.isPlaying = function () {
        return !this.isPaused();
    };
    CarouselTimer.prototype.isStopped = function () {
        return this.isPaused() && this.pausedOffset_ === 0;
    };
    CarouselTimer.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return CarouselTimer;
}());
export { CarouselTimer };
//# sourceMappingURL=timer.js.map