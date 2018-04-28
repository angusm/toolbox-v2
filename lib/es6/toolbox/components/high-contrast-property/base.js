import { Color } from "../../utils/color/color";
import { renderLoop } from "../../utils/render-loop";
import { getElementBehind } from "../../utils/dom/position/get-element-behind";
import { setStyle } from "../../utils/dom/style/set-style";
var HighContrastProperty = (function () {
    function HighContrastProperty(target, candidateBgElements, getColorOptionsFn, _a) {
        var _b = _a === void 0 ? {
            getColorMapFn: function () { return new Map(); },
            getHighContrastColorFn: null,
        } : _a, _c = _b.getColorMapFn, getColorMapFn = _c === void 0 ? function () { return new Map(); } : _c, _d = _b.getHighContrastColorFn, getHighContrastColorFn = _d === void 0 ? null : _d;
        this.destroyed_ = false;
        this.target_ = target;
        this.candidateBgElements_ = candidateBgElements;
        this.getColorOptionsFn_ = getColorOptionsFn;
        this.getColorMapFn_ = getColorMapFn;
        this.getHighContrastColorFn_ = getHighContrastColorFn;
        this.init_();
    }
    HighContrastProperty.getProperty = function () {
        return '';
    };
    HighContrastProperty.prototype.init_ = function () {
        var _this = this;
        renderLoop.cleanup(function () { return _this.render_(); });
    };
    HighContrastProperty.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var bgElement = getElementBehind(_this.target_, _this.candidateBgElements_);
            var textColorToSet = _this.getTextColorToSet_(bgElement);
            renderLoop.mutate(function () { return setStyle(_this.target_, _this.constructor.getProperty(), textColorToSet.toStyleString()); });
        });
    };
    HighContrastProperty.prototype.getTextColorToSet_ = function (bgElement) {
        var behindBgColor = Color.fromElementBackgroundColor(bgElement);
        if (this.getHighContrastColorFn_) {
            return this.getHighContrastColorFn_(this.target_, bgElement);
        }
        else if (this.getColorMapFn_().has(behindBgColor)) {
            return this.getColorMapFn_().get(behindBgColor);
        }
        else {
            return behindBgColor
                .getColorWithHighestContrast.apply(behindBgColor, this.getColorOptionsFn_());
        }
    };
    HighContrastProperty.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return HighContrastProperty;
}());
export { HighContrastProperty };
//# sourceMappingURL=base.js.map