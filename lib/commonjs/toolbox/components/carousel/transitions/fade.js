"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var get_opacity_1 = require("../../../utils/dom/style/get-opacity");
var render_loop_1 = require("../../../utils/render-loop");
var Fade = (function (_super) {
    __extends(Fade, _super);
    function Fade(step) {
        if (step === void 0) { step = 0.1; }
        var _this = _super.call(this) || this;
        _this.step_ = step;
        return _this;
    }
    Fade.prototype.init = function (targetSlide, carousel) {
        render_loop_1.renderLoop.mutate(function () {
            carousel.getSlides()
                .forEach(function (slide) { return slide.style.opacity = '0'; });
            targetSlide.style.opacity = '1';
        });
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
    return Fade;
}(base_1.Transition));
exports.Fade = Fade;
//# sourceMappingURL=fade.js.map