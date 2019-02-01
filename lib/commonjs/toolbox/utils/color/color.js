"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_map_1 = require("./color-map");
var get_substrings_of_length_1 = require("../string/get-substrings-of-length");
var hex_to_int_1 = require("../hex-to-int");
var max_1 = require("../iterable/max");
var trim_1 = require("../string/trim");
var get_style_1 = require("../dom/style/get-style");
var multi_value_1 = require("../map/multi-value");
var rgb_1 = require("./rgb");
var HEX_VALUES = '0123456789abcdefABCDEF';
var colorInstances = new multi_value_1.MultiValueMap();
var Color = (function () {
    function Color(red, green, blue, alpha) {
        if (red === void 0) { red = 0; }
        if (green === void 0) { green = 0; }
        if (blue === void 0) { blue = 0; }
        if (alpha === void 0) { alpha = 1; }
        if (colorInstances.has([red, green, blue, alpha])) {
            return colorInstances.get([red, green, blue, alpha]);
        }
        else {
            this.rgb_ = new rgb_1.RGB(red, green, blue);
            this.alpha_ = alpha;
            colorInstances.set([red, green, blue, alpha], this);
            return this;
        }
    }
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
        return new (Color.bind.apply(Color, [void 0].concat(colorValues.map(function (colorValue) { return hex_to_int_1.hexToInt(colorValue); }))))();
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
        var intValues = values.map(trim_1.trim).map(function (trimmed) { return parseInt(trimmed); });
        return new (Color.bind.apply(Color, [void 0].concat(intValues)))();
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
        var values = this.getRGB().getValues().map(function (value) { return Math.round(value); }).concat([
            this.alpha_
        ]);
        return "rgba(" + values.join(', ') + ")";
    };
    Color.prototype.toNumbers = function () {
        return this.rgb_.toNumbers().concat([this.alpha_]);
    };
    Color.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Color.bind.apply(Color, [void 0].concat(values)))();
    };
    return Color;
}());
exports.Color = Color;
//# sourceMappingURL=color.js.map