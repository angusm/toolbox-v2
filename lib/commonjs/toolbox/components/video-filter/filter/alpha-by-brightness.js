"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaByBrightness = void 0;
var numeric_range_1 = require("../../../utils/math/numeric-range");
var DEFAULT_RANGE = new numeric_range_1.NumericRange(0, 255);
var AlphaByBrightness = (function () {
    function AlphaByBrightness(validRange) {
        if (validRange === void 0) { validRange = DEFAULT_RANGE; }
        this.validRange_ = validRange;
    }
    AlphaByBrightness.prototype.filter = function (imageData) {
        var colorValues = imageData.data;
        var length = colorValues.length;
        for (var i = 0; i < length; i += 4) {
            colorValues[i + 3] =
                255 *
                    this.validRange_.getValueAsPercent(3 * colorValues[i] + 4 * colorValues[i + 1] + colorValues[i + 2] >>> 3);
        }
        return imageData;
    };
    return AlphaByBrightness;
}());
exports.AlphaByBrightness = AlphaByBrightness;
//# sourceMappingURL=alpha-by-brightness.js.map