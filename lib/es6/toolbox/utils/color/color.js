var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ColorMap } from './color-map';
import { Vector } from '../math/geometry/vector';
import { getSubstringsOfLength } from '../string/get-substrings-of-length';
import { hexToInt } from '../hex-to-int';
import { max } from '../iterable/max';
import { trim } from '../string/trim';
import { getStyle } from "../dom/style/get-style";
import { MultiValueMap } from "../map/multi-value";
var HEX_VALUES = '0123456789abcdefABCDEF';
var colorInstances = new MultiValueMap();
var rgbInstances = new MultiValueMap();
var RGB = (function (_super) {
    __extends(RGB, _super);
    function RGB(red, green, blue) {
        if (red === void 0) { red = 0; }
        if (green === void 0) { green = 0; }
        if (blue === void 0) { blue = 0; }
        var _this = _super.call(this, red, green, blue) || this;
        if (rgbInstances.has([red, green, blue])) {
            return rgbInstances.get([red, green, blue]);
        }
        else {
            _this.red_ = red;
            _this.green_ = green;
            _this.blue_ = blue;
            return _this;
        }
    }
    return RGB;
}(Vector));
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
            this.rgb_ = new RGB(red, green, blue);
            this.alpha_ = alpha;
            return this;
        }
    }
    Color.fromString = function (value) {
        if (Color.isHexValue_(value)) {
            return this.fromHex(value);
        }
        else if (value.slice(0, 3) === 'rgb') {
            return this.fromRgb(value);
        }
        else if (ColorMap.get(value)) {
            return this.fromHex(ColorMap.get(value));
        }
        else {
            console.error('Invalid string provided to Color.fromString');
        }
    };
    Color.fromHex = function (value) {
        var hexValue = value.split('#').slice(-1)[0];
        if (hexValue.length !== 3 && hexValue.length !== 6) {
            console.error('Invalid hexValue provided to Color');
        }
        var valueLength = hexValue.length / 3;
        var colorValues = getSubstringsOfLength(hexValue, valueLength);
        return new (Color.bind.apply(Color, [void 0].concat(colorValues.map(function (colorValue) { return hexToInt(colorValue); }))))();
    };
    Color.fromRgb = function (value) {
        var values = value.split('(').slice(-1)[0].split(')')[0].split(',');
        var intValues = values.map(trim).map(function (trimmed) { return parseInt(trimmed); });
        return new (Color.bind.apply(Color, [void 0].concat(intValues)))();
    };
    Color.fromElementBackgroundColor = function (el) {
        return this.fromString(getStyle(el, 'background-color'));
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
    Color.prototype.getColorWithHighestContrast = function () {
        var _this = this;
        var colors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            colors[_i] = arguments[_i];
        }
        return max(colors, function (color) { return color.getRGB().subtract(_this.getRGB()).getLength(); });
    };
    Color.prototype.toStyleString = function () {
        var values = this.getRGB().getValues().concat([this.alpha_]);
        return "rgba(" + values.join(', ') + ")";
    };
    return Color;
}());
export { Color, RGB };
//# sourceMappingURL=color.js.map