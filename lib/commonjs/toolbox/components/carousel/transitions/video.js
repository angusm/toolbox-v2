"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
var render_loop_1 = require("../../../utils/render-loop");
var array_1 = require("../../../utils/map/array");
var max_1 = require("../../../utils/array/max");
var Video = (function () {
    function Video(video, transitionPoint) {
        this.activeSlides_ = new Map();
        this.transitionTargets_ = new array_1.ArrayMap();
        this.transitionTime_ = transitionPoint;
        this.shouldShift_ = false;
        this.video_ = video;
    }
    Video.prototype.init = function (targetSlide, carousel) {
        var _this = this;
        render_loop_1.renderLoop.mutate(function () {
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
        if (timeToTransition < render_loop_1.renderLoop.getMsPerFrame()) {
            this.shouldShift_ = true;
            render_loop_1.renderLoop.mutate(function () {
                carousel.getSlides()
                    .filter(function (slide) { return slide !== nextTarget; })
                    .forEach(function (slide) { return slide.style.opacity = '0'; });
                nextTarget.style.opacity = '1';
                _this.activeSlides_.set(carousel, nextTarget);
            });
        }
    };
    Video.prototype.hasTransitionedTo = function (targetSlide, carousel) {
        var mostVisibleSlide = max_1.max(carousel.getSlides(), function (slide) { return parseFloat(slide.style.opacity); });
        return targetSlide === mostVisibleSlide;
    };
    Video.prototype.renderLoop = function (carousel) { };
    return Video;
}());
exports.Video = Video;
//# sourceMappingURL=video.js.map