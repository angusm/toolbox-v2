"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fade = void 0;
var get_opacity_1 = require("../../../utils/dom/style/get-opacity");
var render_loop_1 = require("../../../utils/render-loop");
var get_most_visible_element_1 = require("../../../utils/dom/position/get-most-visible-element");
var Fade = (function () {
    function Fade(step) {
        if (step === void 0) { step = 0.1; }
        this.step_ = step;
    }
    Fade.prototype.init = function (targetSlide, carousel) {
        render_loop_1.renderLoop.mutate(function () {
            carousel.getSlides()
                .forEach(function (slide) { return slide.style.opacity = '0'; });
            targetSlide.style.opacity = '1';
        });
    };
    Fade.prototype.getActiveSlide = function (carousel) {
        return get_most_visible_element_1.getMostVisibleElement(carousel.getSlides(), carousel.getContainer(), true);
    };
    Fade.prototype.transition = function (targetSlide, carousel) {
        var _this = this;
        var slidesToFade = carousel.getSlides().filter(function (slide) { return slide !== targetSlide; });
        render_loop_1.renderLoop.measure(function () {
            var opacity = get_opacity_1.getOpacity(targetSlide) + _this.step_;
            render_loop_1.renderLoop.mutate(function () { return targetSlide.style.opacity = '' + Math.min(1, opacity); });
            slidesToFade.forEach(function (slide) {
                var opacity = get_opacity_1.getOpacity(slide) - _this.step_;
                render_loop_1.renderLoop.mutate(function () { return slide.style.opacity = '' + Math.max(0, opacity); });
            });
        });
    };
    Fade.prototype.hasTransitionedTo = function (slide, carousel) {
        return slide === null || slide.style.opacity === '1';
    };
    Fade.prototype.renderLoop = function (carousel) { };
    return Fade;
}());
exports.Fade = Fade;
//# sourceMappingURL=fade.js.map