import { Color } from "../../utils/color/color";
import { renderLoop } from "../../utils/render-loop";
import { getElementBehind } from "../../utils/dom/position/get-element-behind";
import { setStyle } from "../../utils/dom/style/set-style";
var HighContrastProperty = (function () {
    function HighContrastProperty(getTargetsFn, getCandidateBgElements, getColorOptionsFn, _a) {
        var _b = _a === void 0 ? {
            getColorMapFn: function () { return new Map(); },
            getHighContrastColorFn: null,
        } : _a, _c = _b.getColorMapFn, getColorMapFn = _c === void 0 ? function () { return new Map(); } : _c, _d = _b.getHighContrastColorFn, getHighContrastColorFn = _d === void 0 ? null : _d;
        this.destroyed_ = false;
        this.getTargetsFn_ = getTargetsFn;
        this.getCandidateBgElements_ = getCandidateBgElements;
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
            var bgElements = _this.getCandidateBgElements_();
            _this.getTargetsFn_().forEach(function (target) {
                var bgElement = getElementBehind(target, bgElements);
                var textColorToSet = _this.getTextColorToSet_(target, bgElement);
                renderLoop.mutate(function () { return setStyle(target, _this.constructor.getProperty(), textColorToSet.toStyleString()); });
            });
        });
    };
    HighContrastProperty.prototype.getTextColorToSet_ = function (target, bgElement) {
        var behindBgColor = Color.fromElementBackgroundColor(bgElement);
        if (this.getHighContrastColorFn_) {
            return this.getHighContrastColorFn_(target, bgElement);
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