"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CssClassesOnly = (function () {
    function CssClassesOnly() {
        this.activeSlides_ = new Map();
    }
    CssClassesOnly.prototype.init = function (targetSlide, carousel) {
        this.activeSlides_.set(carousel, targetSlide);
    };
    CssClassesOnly.prototype.getActiveSlide = function (carousel) {
        return this.activeSlides_.get(carousel);
    };
    CssClassesOnly.prototype.transition = function (targetSlide, carousel) {
        this.activeSlides_.set(carousel, targetSlide);
    };
    CssClassesOnly.prototype.hasTransitionedTo = function (slide, carousel) {
        return this.activeSlides_.get(carousel) === slide;
    };
    CssClassesOnly.prototype.renderLoop = function (carousel) { };
    return CssClassesOnly;
}());
exports.CssClassesOnly = CssClassesOnly;
//# sourceMappingURL=css-classes-only.js.map