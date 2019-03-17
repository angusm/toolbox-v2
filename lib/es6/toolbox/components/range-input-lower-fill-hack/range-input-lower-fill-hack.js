import { Color } from "../../utils/dom/style/css-style-value/color";
import { UserAgent } from "../../utils/user-agent/user-agent";
import { Chrome } from "../../utils/user-agent/browser/chrome";
import { NumericRange } from "../../utils/math/numeric-range";
import { renderLoop } from "../../utils/render-loop";
import { Safari } from "../../utils/user-agent/browser/safari";
var targetedBrowsers = new Set([Chrome, Safari]);
var RangeInputLowerFillHack = (function () {
    function RangeInputLowerFillHack(rangeInput, backgroundColor, fillColor) {
        var _this = this;
        this.element_ = rangeInput;
        this.inputHandler_ = function () { return _this.updateSliderStyle_(); };
        this.backgroundColor_ =
            RangeInputLowerFillHack.processColorParams_(backgroundColor);
        this.fillColor_ = RangeInputLowerFillHack.processColorParams_(fillColor);
        this.lastValue_ = null;
        this.destroyed_ = false;
    }
    RangeInputLowerFillHack.processColorParams_ = function (color) {
        return color instanceof Color ? color.toStyleString() : color;
    };
    RangeInputLowerFillHack.prototype.init = function () {
        if (!targetedBrowsers.has(UserAgent.getBrowser())) {
            return;
        }
        this.element_.addEventListener('input', this.inputHandler_);
        this.renderLoop_();
    };
    RangeInputLowerFillHack.prototype.renderLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.renderLoop_(); });
            _this.updateSliderStyle_();
        });
    };
    RangeInputLowerFillHack.prototype.updateSliderStyle_ = function () {
        var _this = this;
        var value = parseFloat(this.element_.value);
        var min = parseFloat(this.element_.min) || 0;
        var max = parseFloat(this.element_.max) || 100;
        if (this.lastValue_ === value &&
            this.lastMin_ === min &&
            this.lastMax_ === max) {
            return;
        }
        this.lastValue_ = value;
        this.lastMin_ = min;
        this.lastMax_ = max;
        var percent = new NumericRange(min, max).getValueAsPercent(value) * 100;
        renderLoop.anyMutate(function () {
            _this.element_.style.background =
                'linear-gradient(' +
                    ("to right, " + _this.fillColor_ + " 0%,") +
                    (_this.fillColor_ + " " + percent + "%, ") +
                    (_this.backgroundColor_ + " " + percent + "%, ") +
                    (_this.backgroundColor_ + " 100%)");
        });
    };
    RangeInputLowerFillHack.prototype.destroy = function () {
        this.element_.removeEventListener('input', this.inputHandler_);
        this.destroyed_ = true;
    };
    return RangeInputLowerFillHack;
}());
export { RangeInputLowerFillHack };
//# sourceMappingURL=range-input-lower-fill-hack.js.map