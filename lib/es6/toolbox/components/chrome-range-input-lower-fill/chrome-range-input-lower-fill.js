import { Color } from "../../utils/dom/style/css-style-value/color";
import { UserAgent } from "../../utils/user-agent/user-agent";
import { Chrome } from "../../utils/user-agent/browser/chrome";
import { NumericRange } from "../../utils/math/numeric-range";
var ChromeRangeInputLowerFill = (function () {
    function ChromeRangeInputLowerFill(rangeInput, backgroundColor, fillColor) {
        var _this = this;
        this.element_ = rangeInput;
        this.inputHandler_ = function () { return _this.handleInput_(); };
        this.backgroundColor_ =
            ChromeRangeInputLowerFill.processColorParams_(backgroundColor);
        this.fillColor_ = ChromeRangeInputLowerFill.processColorParams_(fillColor);
    }
    ChromeRangeInputLowerFill.processColorParams_ = function (color) {
        return color instanceof Color ? color.toStyleString() : color;
    };
    ChromeRangeInputLowerFill.prototype.init = function () {
        if (UserAgent.getBrowser() !== Chrome) {
            return;
        }
        this.element_.addEventListener('input', this.inputHandler_);
    };
    ChromeRangeInputLowerFill.prototype.handleInput_ = function () {
        var value = parseFloat(this.element_.value);
        var min = parseFloat(this.element_.min) || 0;
        var max = parseFloat(this.element_.max) || 100;
        var percent = new NumericRange(min, max).getValueAsPercent(value) * 100;
        this.element_.style.background =
            'linear-gradient(' +
                ("to right, " + this.fillColor_ + " 0%,") +
                (this.fillColor_ + " " + percent + "%, ") +
                (this.backgroundColor_ + " " + percent + "%, ") +
                (this.backgroundColor_ + " 100%)");
    };
    ChromeRangeInputLowerFill.prototype.destroy = function () {
        this.element_.removeEventListener('input', this.inputHandler_);
    };
    return ChromeRangeInputLowerFill;
}());
export { ChromeRangeInputLowerFill };
//# sourceMappingURL=chrome-range-input-lower-fill.js.map