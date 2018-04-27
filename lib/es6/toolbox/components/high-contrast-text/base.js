import { Color } from "../../utils/color/color";
import { renderLoop } from "../../utils/render-loop";
import { getElementBehind } from "../../utils/dom/position/get-element-behind";
import { setStyle } from "../../utils/dom/style/set-style";
var HighContrastText = (function () {
    function HighContrastText(target, candidateBgElements, colorOptions, colorMap) {
        if (colorMap === void 0) { colorMap = null; }
        this.destroyed_ = false;
        this.target_ = target;
        this.candidateBgElements_ = candidateBgElements;
        this.colorOptions_ = colorOptions;
        this.colorMap_ = colorMap || new Map();
        this.init_();
    }
    HighContrastText.prototype.init_ = function () {
        var _this = this;
        renderLoop.cleanup(function () { return _this.render_(); });
    };
    HighContrastText.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var elementBehind = getElementBehind(_this.target_, _this.candidateBgElements_);
            var behindBgColor = Color.fromElementBackgroundColor(elementBehind);
            var textColorToSet = _this.getTextColorToSet_(behindBgColor);
            renderLoop.mutate(function () { return setStyle(_this.target_, 'color', textColorToSet.toStyleString()); });
        });
    };
    HighContrastText.prototype.getTextColorToSet_ = function (behindBgColor) {
        if (this.colorMap_.has(behindBgColor)) {
            return this.colorMap_.get(behindBgColor);
        }
        else {
            return behindBgColor.getColorWithHighestContrast.apply(behindBgColor, this.colorOptions_);
        }
    };
    HighContrastText.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return HighContrastText;
}());
export { HighContrastText };
//# sourceMappingURL=base.js.map