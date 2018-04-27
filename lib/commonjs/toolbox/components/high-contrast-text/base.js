"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../../utils/color/color");
var render_loop_1 = require("../../utils/render-loop");
var get_element_behind_1 = require("../../utils/dom/position/get-element-behind");
var set_style_1 = require("../../utils/dom/style/set-style");
var ColorTextFromBackground = (function () {
    function ColorTextFromBackground(target, candidateBgElements, colorOptions, colorMap) {
        if (colorMap === void 0) { colorMap = null; }
        this.destroyed_ = false;
        this.target_ = target;
        this.candidateBgElements_ = candidateBgElements;
        this.colorOptions_ = colorOptions;
        this.colorMap_ = colorMap || new Map();
        this.init_();
    }
    ColorTextFromBackground.prototype.init_ = function () {
        var _this = this;
        render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
    };
    ColorTextFromBackground.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var elementBehind = get_element_behind_1.getElementBehind(_this.target_, _this.candidateBgElements_);
            var behindBgColor = color_1.Color.fromElementBackgroundColor(elementBehind);
            var textColorToSet = _this.getTextColorToSet_(behindBgColor);
            render_loop_1.renderLoop.mutate(function () { return set_style_1.setStyle(_this.target_, 'color', textColorToSet.toStyleString()); });
        });
    };
    ColorTextFromBackground.prototype.getTextColorToSet_ = function (behindBgColor) {
        if (this.colorMap_.has(behindBgColor)) {
            return this.colorMap_.get(behindBgColor);
        }
        else {
            return behindBgColor.getColorWithHighestContrast.apply(behindBgColor, this.colorOptions_);
        }
    };
    ColorTextFromBackground.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return ColorTextFromBackground;
}());
exports.ColorTextFromBackground = ColorTextFromBackground;
//# sourceMappingURL=base.js.map