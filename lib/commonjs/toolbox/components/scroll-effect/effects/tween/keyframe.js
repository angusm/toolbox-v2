"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_string_to_map_1 = require("../../../../utils/dom/style/style-string-to-map");
var flatten_1 = require("../../../../utils/array/flatten");
var property_to_tweenable_value_1 = require("./property-to-tweenable-value");
var get_tweenable_value_1 = require("./get-tweenable-value");
var Keyframe = (function () {
    function Keyframe(position, property, value) {
        this.position_ = position;
        this.property_ = property;
        this.value_ = value;
    }
    Keyframe.prototype.getPosition = function () {
        return this.position_;
    };
    Keyframe.prototype.getProperty = function () {
        return this.property_;
    };
    Keyframe.prototype.getValue = function () {
        return this.value_;
    };
    Keyframe.prototype.setPosition = function (position) {
        return new Keyframe(position, this.property_, this.value_);
    };
    Keyframe.parseStyleMap_ = function (position, styleMap) {
        return Array.from(styleMap.entries())
            .filter(function (_a) {
            var property = _a[0], value = _a[1];
            return property_to_tweenable_value_1.propertyToTweenableValue.has(property);
        })
            .map(function (_a) {
            var property = _a[0], value = _a[1];
            return new Keyframe(position, property, get_tweenable_value_1.getTweenableValue(property, value));
        });
    };
    Keyframe.parseConfig = function (config) {
        var mappedStyles = this.mapKeyframesConfig_(config);
        var keyframes = Array.from(mappedStyles.entries())
            .sort(function (a, b) { return a[0] - b[0]; })
            .map(function (_a) {
            var x = _a[0], styleString = _a[1];
            return [x, style_string_to_map_1.styleStringToMap(styleString)];
        })
            .map(function (_a) {
            var position = _a[0], styleObject = _a[1];
            return Keyframe.parseStyleMap_(position, styleObject);
        });
        return flatten_1.flatten(keyframes);
    };
    Keyframe.mapKeyframesConfig_ = function (config) {
        var mappedStyles = new Map();
        config
            .forEach(function (_a) {
            var position = _a[0], styleString = _a[1];
            if (mappedStyles.has(position)) {
                var splitStyles = mappedStyles.get(position).split(';').concat([
                    styleString
                ]);
                mappedStyles.set(position, splitStyles.join(';'));
            }
            else {
                mappedStyles.set(position, styleString);
            }
        });
        return mappedStyles;
    };
    return Keyframe;
}());
exports.Keyframe = Keyframe;
//# sourceMappingURL=keyframe.js.map