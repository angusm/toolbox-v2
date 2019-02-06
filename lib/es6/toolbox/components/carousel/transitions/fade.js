import { getOpacity } from '../../../utils/dom/style/get-opacity';
import { renderLoop } from '../../../utils/render-loop';
import { getMostVisibleElement } from "../../../utils/dom/position/get-most-visible-element";
var Fade = (function () {
    function Fade(step) {
        if (step === void 0) { step = 0.1; }
        this.step_ = step;
    }
    Fade.prototype.init = function (targetSlide, carousel) {
        renderLoop.mutate(function () {
            carousel.getSlides()
                .forEach(function (slide) { return slide.style.opacity = '0'; });
            targetSlide.style.opacity = '1';
        });
    };
    Fade.prototype.getActiveSlide = function (carousel) {
        return getMostVisibleElement(carousel.getSlides(), carousel.getContainer(), true);
    };
    Fade.prototype.transition = function (targetSlide, carousel) {
        var _this = this;
        var slidesToFade = carousel.getSlides().filter(function (slide) { return slide !== targetSlide; });
        renderLoop.measure(function () {
            var opacity = getOpacity(targetSlide) + _this.step_;
            renderLoop.mutate(function () { return targetSlide.style.opacity = '' + Math.min(1, opacity); });
            slidesToFade.forEach(function (slide) {
                var opacity = getOpacity(slide) - _this.step_;
                renderLoop.mutate(function () { return slide.style.opacity = '' + Math.max(0, opacity); });
            });
        });
    };
    return Fade;
}());
export { Fade };
//# sourceMappingURL=fade.js.map