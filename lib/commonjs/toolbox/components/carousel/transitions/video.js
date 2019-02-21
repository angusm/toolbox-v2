"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
var get_most_visible_element_1 = require("../../../utils/dom/position/get-most-visible-element");
var Video = (function () {
    function Video(video, transitionPoint) {
        this.transitionTargets_ = new Map();
        this.transitionTime_ = transitionPoint;
        this.video_ = video;
    }
    Video.prototype.init = function (targetSlide, carousel) {
        render_loop_1.renderLoop.mutate(function () {
            carousel.getSlides()
                .forEach(function (slide) { return slide.style.opacity = '0'; });
            targetSlide.style.opacity = '1';
        });
    };
    Video.prototype.getActiveSlide = function (carousel) {
        return get_most_visible_element_1.getMostVisibleElement(carousel.getSlides(), carousel.getContainer(), true);
    };
    Video.prototype.transition = function (targetSlide, carousel) {
        var timeToTransition = Math.abs(this.video_.currentTime * 1000 - this.transitionTime_);
        this.video_.play();
        if (timeToTransition < render_loop_1.renderLoop.getMsPerFrame()) {
            render_loop_1.renderLoop.mutate(function () {
                carousel.getSlides()
                    .forEach(function (slide) { return slide.style.opacity = '0'; });
                targetSlide.style.opacity = '1';
            });
        }
    };
    Video.prototype.hasTransitionedTo = function (slide, carousel) {
        return slide === null || slide.style.opacity === '1';
    };
    Video.prototype.renderLoop = function (carousel) { };
    return Video;
}());
exports.Video = Video;
//# sourceMappingURL=video.js.map