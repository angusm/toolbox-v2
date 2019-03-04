import { NumericRange } from "../../../utils/math/numeric-range";
var DEFAULT_RANGE = new NumericRange(0, 255);
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
export { AlphaByBrightness };
//# sourceMappingURL=alpha-by-brightness.js.map