import { styleStringToMap } from "../../../../utils/dom/style/style-string-to-map";
import { flatten } from "../../../../utils/array/flatten";
import { propertyToTweenableValue } from "./property-to-tweenable-value";
import { getTweenableValue } from "./get-tweenable-value";
import { Transform } from "../../../../utils/dom/style/transform/transform";
import { Filter } from "../../../../utils/dom/style/filter/filter";
import { generateTweenableTransformClass } from "./generate-tweenable-transform-class";
import { DynamicDefaultMap } from "../../../../utils/map/dynamic-default";
import { generateTweenableFilterClass } from "./generate-tweenable-filter-class";
var SPECIALLY_HANDLED_PROPERTIES = new Set(['filter', 'transform']);
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
        else if (this.property_ === 'filter') {
            return this.getFilterValue_(adjacentKeyframe);
        }
        else if (this.property_ === 'transform') {
            return this.getTransformValue_(adjacentKeyframe);
        }
        else if (this.isDynamicValue()) {
            this.cachedValue_ = getTweenableValue(this.property_, this.getRawValue());
            return this.cachedValue_;
        }
        else {
            return getTweenableValue(this.property_, this.getRawValue());
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
        return propertyToTweenableValue.has(property) ||
            SPECIALLY_HANDLED_PROPERTIES.has(property);
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
        return flatten(sortedStyleMaps.map(function (_a) {
            var position = _a[0], styleMap = _a[1];
            return Keyframe.parseStyleMap_(position, styleMap);
        }));
    };
    Keyframe.configToSortedStyleMaps_ = function (config) {
        var mappedStyles = DynamicDefaultMap
            .usingFunction(function () { return new Map(); });
        config.forEach(function (_a) {
            var position = _a[0], style = _a[1];
            var positionMap = mappedStyles.get(position);
            var styleMap = typeof style === 'string' ? styleStringToMap(style) : style;
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
    Keyframe.prototype.getSortedKeyframes_ = function (adjacentKeyframe) {
        if (this.getPosition() > adjacentKeyframe.getPosition()) {
            return [adjacentKeyframe, this];
        }
        else {
            return [this, adjacentKeyframe];
        }
    };
    Keyframe.getFilterClassesInOrder_ = function (filters) {
        var orderedListsOfFilterClasses = filters.map(function (filter) { return filter.getFilterValueClasses(); });
        var filterClassesInOrder = [];
        for (var position = 0; position < orderedListsOfFilterClasses.length; position++) {
            var classesForPosition = orderedListsOfFilterClasses[position];
            for (var classIndex = 0; classIndex < classesForPosition.length; classIndex++) {
                var classToAdd = classesForPosition[classIndex];
                filterClassesInOrder.push(classToAdd);
                for (var k = 0; k < orderedListsOfFilterClasses.length; k++) {
                    var subsequentClassesForPosition = orderedListsOfFilterClasses[k];
                    if (subsequentClassesForPosition[0] === classToAdd) {
                        orderedListsOfFilterClasses[k] =
                            subsequentClassesForPosition.slice(1);
                    }
                }
            }
        }
        return filterClassesInOrder;
    };
    Keyframe.prototype.getFilterValue_ = function (adjacentKeyframe) {
        var sortedKeyframes = this.getSortedKeyframes_(adjacentKeyframe);
        var sortedFilters = sortedKeyframes
            .map(function (keyframe) { return Filter.fromStyleString(keyframe.getRawValue()); });
        var primaryFilter = Filter.fromStyleString(this.getRawValue());
        var filterClassesInOrder = Keyframe.getFilterClassesInOrder_(sortedFilters);
        var TweenableFilterClass = generateTweenableFilterClass(filterClassesInOrder);
        var filterValues = primaryFilter.getFilterValues();
        var filterClasses = primaryFilter.getFilterValueClasses();
        var numbers = [];
        var currentFilterClassesIndex = 0;
        var allFilterClassesIndex = 0;
        while (allFilterClassesIndex < filterClassesInOrder.length) {
            var anticipatedFilterClass = filterClassesInOrder[allFilterClassesIndex];
            var currentFilterClass = filterClasses[currentFilterClassesIndex];
            if (anticipatedFilterClass === currentFilterClass) {
                numbers = numbers.concat(filterValues[currentFilterClassesIndex].toNumbers());
                currentFilterClassesIndex++;
            }
            else {
                numbers = numbers.concat(anticipatedFilterClass.getDefaultValue().toNumbers());
            }
            allFilterClassesIndex++;
        }
        return TweenableFilterClass.fromNumbers.apply(TweenableFilterClass, numbers);
    };
    Keyframe.prototype.getTransformValue_ = function (adjacentKeyframe) {
        var sortedKeyframes = this.getSortedKeyframes_(adjacentKeyframe);
        var sortedTransforms = sortedKeyframes
            .map(function (keyframe) { return Transform.fromStyleString(keyframe.getRawValue()); });
        var primaryTransform = Transform.fromStyleString(this.getRawValue());
        var transformClassesInOrder = Keyframe.getTransformClassesInOrder_(sortedTransforms);
        var TweenableTransformClass = generateTweenableTransformClass(transformClassesInOrder);
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
export { Keyframe };
//# sourceMappingURL=keyframe.js.map