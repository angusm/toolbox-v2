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
import { Transition } from './base';
import { getOpacity } from '../../../utils/dom/style/get-opacity';
import { renderLoop } from '../../../utils/render-loop';
var Fade = (function (_super) {
    __extends(Fade, _super);
    function Fade(step) {
        if (step === void 0) { step = 0.1; }
        var _this = _super.call(this) || this;
        _this.step_ = step;
        return _this;
    }
    Fade.prototype.init = function (targetSlide, carousel) {
        renderLoop.mutate(function () {
            carousel.getSlides()
                .forEach(function (slide) { return slide.style.opacity = '0'; });
            targetSlide.style.opacity = '1';
        });
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
}(Transition));
export { Fade };
//# sourceMappingURL=fade.js.map