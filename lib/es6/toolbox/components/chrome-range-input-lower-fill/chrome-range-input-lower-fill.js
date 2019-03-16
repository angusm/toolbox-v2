import { Color } from "../../utils/dom/style/css-style-value/color";
import { UserAgent } from "../../utils/user-agent/user-agent";
import { Chrome } from "../../utils/user-agent/browser/chrome";
import { NumericRange } from "../../utils/math/numeric-range";
import { renderLoop } from "../../utils/render-loop";
var ChromeRangeInputLowerFill = (function () {
    function ChromeRangeInputLowerFill(rangeInput, backgroundColor, fillColor) {
        var _this = this;
        this.element_ = rangeInput;
        this.inputHandler_ = function () { return _this.updateSliderStyle_(); };
        this.backgroundColor_ =
            ChromeRangeInputLowerFill.processColorParams_(backgroundColor);
        this.fillColor_ = ChromeRangeInputLowerFill.processColorParams_(fillColor);
        this.lastValue_ = null;
        this.destroyed_ = false;
    }
    ChromeRangeInputLowerFill.processColorParams_ = function (color) {
        return color instanceof Color ? color.toStyleString() : color;
    };
    ChromeRangeInputLowerFill.prototype.init = function () {
        if (UserAgent.getBrowser() !== Chrome) {
            return;
        }
        this.element_.addEventListener('input', this.inputHandler_);
        this.renderLoop_();
    };
    ChromeRangeInputLowerFill.prototype.renderLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.renderLoop_(); });
            _this.updateSliderStyle_();
        });
    };
    ChromeRangeInputLowerFill.prototype.updateSliderStyle_ = function () {
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
    ChromeRangeInputLowerFill.prototype.destroy = function () {
        this.element_.removeEventListener('input', this.inputHandler_);
        this.destroyed_ = true;
    };
    return ChromeRangeInputLowerFill;
}());
export { ChromeRangeInputLowerFill };
//# sourceMappingURL=chrome-range-input-lower-fill.js.map