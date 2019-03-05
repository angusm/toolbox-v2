import { renderLoop } from '../../../utils/render-loop';
import { ArrayMap } from "../../../utils/map/array";
import { max } from "../../../utils/array/max";
var Video = (function () {
    function Video(video, transitionPoint) {
        this.activeSlides_ = new Map();
        this.transitionTargets_ = new ArrayMap();
        this.transitionTime_ = transitionPoint;
        this.shouldShift_ = false;
        this.video_ = video;
    }
    Video.prototype.init = function (targetSlide, carousel) {
        var _this = this;
        renderLoop.mutate(function () {
            carousel.getSlides()
                .forEach(function (slide) { return slide.style.opacity = '0'; });
            targetSlide.style.opacity = '1';
            _this.activeSlides_.set(carousel, targetSlide);
        });
    };
    Video.prototype.getActiveSlide = function (carousel) {
        return this.activeSlides_.get(carousel);
    };
    Video.prototype.transition = function (targetSlide, carousel) {
        var _this = this;
        var targets = this.transitionTargets_.get(carousel);
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
        var nextTarget = targets[0];
        var timeToTransition = this.video_.currentTime * 1000 - this.transitionTime_;
        this.video_.play();
        if (timeToTransition < renderLoop.getMsPerFrame()) {
            this.shouldShift_ = true;
            renderLoop.mutate(function () {
                carousel.getSlides()
                    .filter(function (slide) { return slide !== nextTarget; })
                    .forEach(function (slide) { return slide.style.opacity = '0'; });
                nextTarget.style.opacity = '1';
                _this.activeSlides_.set(carousel, nextTarget);
            });
        }
    };
    Video.prototype.hasTransitionedTo = function (targetSlide, carousel) {
        var mostVisibleSlide = max(carousel.getSlides(), function (slide) { return parseFloat(slide.style.opacity); });
        return targetSlide === mostVisibleSlide;
    };
    Video.prototype.renderLoop = function (carousel) { };
    return Video;
}());
export { Video };
//# sourceMappingURL=video.js.map