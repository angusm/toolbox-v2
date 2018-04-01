import { renderLoop } from '../../utils/render-loop';
var DEFAULT_INTERVAL = 5000;
var CarouselTimer = (function () {
    function CarouselTimer(carousel, interval) {
        if (interval === void 0) { interval = DEFAULT_INTERVAL; }
        this.carousel_ = carousel;
        this.interval_ = interval;
        this.lastActionTime_ = new Date().valueOf();
        this.init_();
    }
    CarouselTimer.prototype.init_ = function () {
        this.startTimeout_();
    };
    CarouselTimer.prototype.startTimeout_ = function () {
        var _this = this;
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
    return CarouselTimer;
}());
export { CarouselTimer };
//# sourceMappingURL=timer.js.map