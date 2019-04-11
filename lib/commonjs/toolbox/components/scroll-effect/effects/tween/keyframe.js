"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_string_to_map_1 = require("../../../../utils/dom/style/style-string-to-map");
var flatten_1 = require("../../../../utils/array/flatten");
var property_to_tweenable_value_1 = require("./property-to-tweenable-value");
var get_tweenable_value_1 = require("./get-tweenable-value");
var transform_1 = require("../../../../utils/dom/style/transform/transform");
var generate_tweenable_transform_class_1 = require("./generate-tweenable-transform-class");
var dynamic_default_1 = require("../../../../utils/map/dynamic-default");
var Keyframe = (function () {
    function Keyframe(position, property, value) {
        this.cachedValue_ = null;
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
    Keyframe.prototype.getValue = function (adjacentKeyframe) {
        if (this.cachedValue_ !== null) {
            return this.cachedValue_;
        }
        else if (this.property_ === 'transform') {
            return this.getTransformValue_(adjacentKeyframe);
        }
        else if (this.isDynamicValue()) {
            this.cachedValue_ = get_tweenable_value_1.getTweenableValue(this.property_, this.getRawValue());
            return this.cachedValue_;
        }
        else {
            return get_tweenable_value_1.getTweenableValue(this.property_, this.getRawValue());
        }
    };
    Keyframe.prototype.isDynamicValue = function () {
        return typeof this.value_ === 'string';
    };
    Keyframe.prototype.getRawValue = function () {
        return typeof this.value_ === 'string' ? this.value_ : this.value_();
    };
    Keyframe.prototype.setPosition = function (position) {
        return new Keyframe(position, this.property_, this.value_);
    };
    Keyframe.isValidTweenableProperty_ = function (property) {
        return property_to_tweenable_value_1.propertyToTweenableValue.has(property) || property === 'transform';
    };
    Keyframe.parseStyleMap_ = function (position, styleMap) {
        return Array.from(styleMap.entries())
            .filter(function (_a) {
            var property = _a[0], _ = _a[1];
            return Keyframe.isValidTweenableProperty_(property);
        })
            .map(function (_a) {
            var property = _a[0], value = _a[1];
            return new Keyframe(position, property, value);
        });
    };
    Keyframe.parseConfig = function (config) {
        var sortedStyleMaps = this.configToSortedStyleMaps_(config);
        return flatten_1.flatten(sortedStyleMaps.map(function (_a) {
            var position = _a[0], styleMap = _a[1];
            return Keyframe.parseStyleMap_(position, styleMap);
        }));
    };
    Keyframe.configToSortedStyleMaps_ = function (config) {
        var mappedStyles = dynamic_default_1.DynamicDefaultMap
            .usingFunction(function () { return new Map(); });
        config.forEach(function (_a) {
            var position = _a[0], style = _a[1];
            var positionMap = mappedStyles.get(position);
            var styleMap = typeof style === 'string' ? style_string_to_map_1.styleStringToMap(style) : style;
            styleMap.forEach(function (value, style) { return positionMap.set(style, value); });
        });
        return Array.from(mappedStyles.entries())
            .sort(function (a, b) { return a[0] - b[0]; });
    };
    Keyframe.getTransformClassesInOrder_ = function (transforms) {
        var orderedListsOfTransformClasses = transforms.map(function (transform) { return transform.getTransformValueClasses(); });
        var transformClassesInOrder = [];
        for (var position = 0; position < orderedListsOfTransformClasses.length; position++) {
            var classesForPosition = orderedListsOfTransformClasses[position];
            for (var classIndex = 0; classIndex < classesForPosition.length; classIndex++) {
                var classToAdd = classesForPosition[classIndex];
                transformClassesInOrder.push(classToAdd);
                for (var k = 0; k < orderedListsOfTransformClasses.length; k++) {
                    var subsequentClassesForPosition = orderedListsOfTransformClasses[k];
                    if (subsequentClassesForPosition[0] === classToAdd) {
                        orderedListsOfTransformClasses[k] =
                            subsequentClassesForPosition.slice(1);
                    }
                }
            }
        }
        return transformClassesInOrder;
    };
    Keyframe.prototype.getTransformValue_ = function (adjacentKeyframe) {
        var sortedKeyframes = [this, adjacentKeyframe]
            .sort(function (a, b) { return a.getPosition() - b.getPosition(); });
        var sortedTransforms = sortedKeyframes
            .map(function (keyframe) { return transform_1.Transform.fromStyleString(keyframe.getRawValue()); });
        var primaryTransform = transform_1.Transform.fromStyleString(this.getRawValue());
        var transformClassesInOrder = Keyframe.getTransformClassesInOrder_(sortedTransforms);
        var TweenableTransformClass = generate_tweenable_transform_class_1.generateTweenableTransformClass(transformClassesInOrder);
        var transformValues = primaryTransform.getTransformValues();
        var transformClasses = primaryTransform.getTransformValueClasses();
        var numbers = [];
        var currentTransformClassesIndex = 0;
        var allTransformClassesIndex = 0;
        while (allTransformClassesIndex < transformClassesInOrder.length) {
            var anticipatedTransformClass = transformClassesInOrder[allTransformClassesIndex];
            var currentTransformClass = transformClasses[currentTransformClassesIndex];
            if (anticipatedTransformClass === currentTransformClass) {
                numbers = numbers.concat(transformValues[currentTransformClassesIndex].toNumbers());
                currentTransformClassesIndex++;
            }
            else {
                numbers = numbers.concat(anticipatedTransformClass.getDefaultValue().toNumbers());
            }
            allTransformClassesIndex++;
        }
        return TweenableTransformClass.fromNumbers.apply(TweenableTransformClass, numbers);
    };
    return Keyframe;
}());
exports.Keyframe = Keyframe;
//# sourceMappingURL=keyframe.js.map