import { styleStringToMap } from "../../../../utils/dom/style/style-string-to-map";
import { flatten } from "../../../../utils/array/flatten";
import { propertyToTweenableValue } from "./property-to-tweenable-value";
import { getTweenableValue } from "./get-tweenable-value";
import { Transform } from "../../../../utils/dom/style/transform/transform";
import { generateTweenableTransformClass } from "./generate-tweenable-transform-class";
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
            return propertyToTweenableValue.has(property);
        })
            .map(function (_a) {
            var property = _a[0], value = _a[1];
            return new Keyframe(position, property, getTweenableValue(property, value));
        });
    };
    Keyframe.parseConfig = function (config) {
        var sortedStyleMaps = this.configToSortedStyleMaps_(config);
        return this.getTransformTweenableKeyframes_(sortedStyleMaps).concat(this.getSimpleTweenableKeyframes_(sortedStyleMaps));
    };
    Keyframe.configToSortedStyleMaps_ = function (config) {
        var mappedStyles = this.mapKeyframesConfig_(config);
        return Array.from(mappedStyles.entries())
            .sort(function (a, b) { return a[0] - b[0]; })
            .map(function (_a) {
            var position = _a[0], styleString = _a[1];
            return [
                position, styleStringToMap(styleString)
            ];
        });
    };
    Keyframe.getTransformStyleMaps_ = function (sortedStyleMaps) {
        return sortedStyleMaps
            .filter(function (_a) {
            var position = _a[0], styleMap = _a[1];
            return styleMap.has('transform');
        });
    };
    Keyframe.getTransformsByPosition_ = function (sortedStyleMaps) {
        return this.getTransformStyleMaps_(sortedStyleMaps)
            .map(function (_a) {
            var position = _a[0], styleMap = _a[1];
            return [
                position, Transform.fromStyleString(styleMap.get('transform'))
            ];
        });
    };
    Keyframe.getTransformClassesInOrder_ = function (sortedStyleMaps) {
        var transformsByPosition = this.getTransformsByPosition_(sortedStyleMaps);
        var orderedListsOfTransformClasses = transformsByPosition
            .map(function (_a) {
            var position = _a[0], transform = _a[1];
            return transform.getTransformValueClasses();
        });
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
    Keyframe.getTransformTweenableKeyframes_ = function (sortedStyleMaps) {
        var transformsByPosition = this.getTransformsByPosition_(sortedStyleMaps);
        var transformClassesInOrder = Keyframe.getTransformClassesInOrder_(sortedStyleMaps);
        var TweenableTransformClass = generateTweenableTransformClass(transformClassesInOrder);
        var tweenableTransformsByPosition = transformsByPosition
            .map(function (_a) {
            var position = _a[0], transform = _a[1];
            var transformValues = transform.getTransformValues();
            var transformClasses = transform.getTransformValueClasses();
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
            var tweenableInstance = TweenableTransformClass.fromNumbers.apply(TweenableTransformClass, numbers);
            return [
                position, tweenableInstance
            ];
        });
        return tweenableTransformsByPosition
            .map(function (_a) {
            var position = _a[0], tweenableTransformInstance = _a[1];
            return new Keyframe(position, 'transform', tweenableTransformInstance);
        });
    };
    Keyframe.getSimpleTweenableKeyframes_ = function (sortedStyleMaps) {
        return flatten(sortedStyleMaps
            .map(function (_a) {
            var position = _a[0], styleMap = _a[1];
            return Keyframe.parseStyleMap_(position, styleMap);
        }));
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
export { Keyframe };
//# sourceMappingURL=keyframe.js.map