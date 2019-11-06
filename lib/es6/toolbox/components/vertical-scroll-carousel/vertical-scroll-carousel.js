import { Carousel } from "../carousel/carousel";
import { onDomContentLoad } from "../../utils/dom/on-dom-content-load";
import { renderLoop } from "../../utils/render-loop";
import { getMostVisibleElementIgnoringSticky } from "../../utils/dom/position/vertical/get-most-visible-element-ignoring-sticky";
var VerticalScrollCarousel = (function () {
    function VerticalScrollCarousel(container, slides, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.scrollContainer, scrollContainer = _c === void 0 ? null : _c, _d = _b.carouselConfig, carouselConfig = _d === void 0 ? { allowLooping: false } : _d;
        this.scrollContainer_ = scrollContainer;
        this.carousel_ = new Carousel(container, slides, carouselConfig);
        this.destroyed_ = false;
        this.disabled_ = false;
    }
    VerticalScrollCarousel.fireAndForget = function (container, slides, options) {
        if (options === void 0) { options = {}; }
        var instance = new VerticalScrollCarousel(container, slides, options);
        var _ignoredPromise = onDomContentLoad(function () { return instance.init(); });
        return instance;
    };
    VerticalScrollCarousel.prototype.init = function () {
        this.scrollLoop_();
    };
    VerticalScrollCarousel.prototype.scrollLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.scrollMeasure(function () {
            renderLoop.scrollCleanup(function () { return _this.scrollLoop_(); });
            if (!_this.disabled_) {
                _this.updateActiveSlide_();
            }
        });
    };
    VerticalScrollCarousel.prototype.updateActiveSlide_ = function () {
        this.carousel_.transitionToSlide(getMostVisibleElementIgnoringSticky(this.carousel_.getSlides(), this.scrollContainer_));
    };
    VerticalScrollCarousel.prototype.enable = function () {
        this.disabled_ = false;
        this.updateActiveSlide_();
    };
    VerticalScrollCarousel.prototype.disable = function () {
        this.disabled_ = true;
    };
    VerticalScrollCarousel.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    VerticalScrollCarousel.prototype.getCarousel = function () {
        return this.carousel_;
    };
    return VerticalScrollCarousel;
}());
export { VerticalScrollCarousel };
//# sourceMappingURL=vertical-scroll-carousel.js.map