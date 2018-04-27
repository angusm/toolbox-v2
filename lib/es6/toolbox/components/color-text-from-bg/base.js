import { Color } from "../../utils/color/color";
import { renderLoop } from "../../utils/render-loop";
import { getElementBehind } from "../../utils/dom/position/get-element-behind";
import { setStyle } from "../../utils/dom/style/set-style";
var ColorTextFromBackground = (function () {
    function ColorTextFromBackground(target, candidateBgElements, colorOptions) {
        this.destroyed_ = false;
        this.target_ = target;
        this.candidateBgElements_ = candidateBgElements;
        this.colorOptions_ = colorOptions;
        this.init_();
    }
    ColorTextFromBackground.prototype.init_ = function () {
        var _this = this;
        renderLoop.cleanup(function () { return _this.render_(); });
    };
    ColorTextFromBackground.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var elementBehind = getElementBehind(_this.target_, _this.candidateBgElements_);
            var behindBgColor = Color.fromElementBackgroundColor(elementBehind);
            var textColorToSet = behindBgColor.getColorWithHighestContrast.apply(behindBgColor, _this.colorOptions_);
            renderLoop.mutate(function () { return setStyle(_this.target_, 'color', textColorToSet.toStyleString()); });
        });
    };
    ColorTextFromBackground.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return ColorTextFromBackground;
}());
//# sourceMappingURL=base.js.map