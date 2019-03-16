"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../../utils/dom/style/css-style-value/color");
var user_agent_1 = require("../../utils/user-agent/user-agent");
var chrome_1 = require("../../utils/user-agent/browser/chrome");
var numeric_range_1 = require("../../utils/math/numeric-range");
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
        return color instanceof color_1.Color ? color.toStyleString() : color;
    };
    ChromeRangeInputLowerFill.prototype.init = function () {
        if (user_agent_1.UserAgent.getBrowser() !== chrome_1.Chrome) {
            return;
        }
        this.element_.addEventListener('input', this.inputHandler_);
    };
    ChromeRangeInputLowerFill.prototype.handleInput_ = function () {
        var value = parseFloat(this.element_.value);
        var min = parseFloat(this.element_.min) || 0;
        var max = parseFloat(this.element_.max) || 100;
        var percent = new numeric_range_1.NumericRange(min, max).getValueAsPercent(value) * 100;
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
exports.ChromeRangeInputLowerFill = ChromeRangeInputLowerFill;
//# sourceMappingURL=chrome-range-input-lower-fill.js.map