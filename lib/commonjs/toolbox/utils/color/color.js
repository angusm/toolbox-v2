"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
var color_map_1 = require("./color-map");
var get_substrings_of_length_1 = require("../string/get-substrings-of-length");
var hex_to_int_1 = require("../hex-to-int");
var max_1 = require("../iterable/max");
var trim_1 = require("../string/trim");
var get_style_1 = require("../dom/style/get-style");
var rgb_1 = require("./rgb");
var flatten_1 = require("../array/flatten");
var HEX_VALUES = '0123456789abcdefABCDEF';
var Color = (function () {
    function Color(red, green, blue, alpha) {
        if (red === void 0) { red = 0; }
        if (green === void 0) { green = 0; }
        if (blue === void 0) { blue = 0; }
        if (alpha === void 0) { alpha = 1; }
        this.rgb_ = new rgb_1.RGB(red, green, blue);
        this.alpha_ = alpha;
    }
    Color.fromImageData = function (imageData) {
        var colorValues = imageData.data;
        var result = [];
        for (var i = 0; i < colorValues.length; i += 4) {
            var red = colorValues[i];
            var green = colorValues[i + 1];
            var blue = colorValues[i + 2];
            var alpha = colorValues[i + 3];
            result.push(new Color(red, green, blue, alpha));
        }
        return result;
    };
    Color.toImageData = function (pixels, size) {
        var colorValues = pixels.map(function (pixel) { return pixel.toNumbers(); });
        return new ImageData(new Uint8ClampedArray(flatten_1.flatten(colorValues)), size.width, size.height);
    };
    Color.fromStyleString = function (value) {
        if (Color.isHexValue_(value)) {
            return this.fromHex(value);
        }
        else if (value.slice(0, 3) === 'rgb') {
            return this.fromRgb(value);
        }
        else if (color_map_1.ColorMap.get(value)) {
            return this.fromHex(color_map_1.ColorMap.get(value));
        }
        else {
            console.error("Invalid string \"" + value + "\" provided to Color.fromStyleString");
        }
    };
    Color.fromString = function (value) {
        console.warn('Deprecating in favor of fromStyleString to add wider support for ICssStyleValueInstance');
        return this.fromStyleString(value);
    };
    Color.fromHex = function (value) {
        var hexValue = value.split('#').slice(-1)[0];
        if (hexValue.length !== 3 && hexValue.length !== 6) {
            console.error('Invalid hexValue provided to Color');
        }
        var valueLength = hexValue.length / 3;
        var colorValues = get_substrings_of_length_1.getSubstringsOfLength(hexValue, valueLength);
        var paddedColorValues = colorValues
            .map(function (colorValue) {
            return colorValue.length === 2 ?
                colorValue : "" + colorValue + colorValue;
        });
        var numericColorValues = paddedColorValues.map(function (colorValue) { return hex_to_int_1.hexToInt(colorValue); });
        return new (Color.bind.apply(Color, __spreadArrays([void 0], numericColorValues)))();
    };
    Color.fromHexes = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return values.map(function (value) { return _this.fromHex(value); });
    };
    Color.fromRgb = function (value) {
        var values = value.split('(').slice(-1)[0].split(')')[0].split(',');
        var trimmedValues = values.map(function (value) { return trim_1.trim(value); });
        var rgbValues = trimmedValues.slice(0, 3).map(function (trimmed) { return parseInt(trimmed); });
        var rawAlphaValue = trimmedValues[3];
        var alphaValue = typeof rawAlphaValue === 'undefined' ? 1 : parseFloat(rawAlphaValue);
        return new (Color.bind.apply(Color, __spreadArrays([void 0], rgbValues, [alphaValue])))();
    };
    Color.fromElementBackgroundColor = function (el) {
        return this.fromString(get_style_1.getStyle(el, 'background-color'));
    };
    Color.isHexValue_ = function (value) {
        if (value[0] === '#') {
            value = value.slice(1);
        }
        return value
            .split('').every(function (character) { return HEX_VALUES.indexOf(character) !== -1; });
    };
    Color.prototype.getRGB = function () {
        return this.rgb_;
    };
    Color.prototype.getAlpha = function () {
        return this.alpha_;
    };
    Color.prototype.getColorWithHighestContrast = function () {
        var _this = this;
        var colors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            colors[_i] = arguments[_i];
        }
        return max_1.max(colors, function (color) { return color.getRGB().subtract(_this.getRGB()).getLength(); });
    };
    Color.prototype.toStyleString = function () {
        var values = __spreadArrays(this.getRGB().getValues().map(function (value) { return Math.round(value); }), [
            this.alpha_
        ]);
        return "rgba(" + values.join(', ') + ")";
    };
    Color.prototype.getBrightness = function () {
        return 3 * this.getRed() + 4 * this.getGreen() + this.getBlue() >>> 3;
    };
    Color.prototype.getRed = function () {
        return this.rgb_.getRed();
    };
    Color.prototype.getGreen = function () {
        return this.rgb_.getGreen();
    };
    Color.prototype.getBlue = function () {
        return this.rgb_.getBlue();
    };
    Color.prototype.toNumbers = function () {
        return __spreadArrays(this.rgb_.toNumbers(), [this.alpha_]);
    };
    Color.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Color.bind.apply(Color, __spreadArrays([void 0], values)))();
    };
    return Color;
}());
exports.Color = Color;
//# sourceMappingURL=color.js.map