import { renderLoop } from '../../../utils/render-loop';
import { getMostVisibleElement } from "../../../utils/dom/position/get-most-visible-element";
var Video = (function () {
    function Video(video, transitionPoint) {
        this.transitionTargets_ = new Map();
        this.transitionTime_ = transitionPoint;
        this.video_ = video;
    }
    Video.prototype.init = function (targetSlide, carousel) {
        renderLoop.mutate(function () {
            carousel.getSlides()
                .forEach(function (slide) { return slide.style.opacity = '0'; });
            targetSlide.style.opacity = '1';
        });
    };
    Video.prototype.getActiveSlide = function (carousel) {
        return getMostVisibleElement(carousel.getSlides(), carousel.getContainer(), true);
    };
    Video.prototype.transition = function (targetSlide, carousel) {
        var timeToTransition = Math.abs(this.video_.currentTime * 1000 - this.transitionTime_);
        this.video_.play();
        if (timeToTransition < renderLoop.getMsPerFrame()) {
            renderLoop.mutate(function () {
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
export { Video };
//# sourceMappingURL=video.js.map