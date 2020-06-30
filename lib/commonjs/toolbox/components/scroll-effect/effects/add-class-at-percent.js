"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddClassAtPercent = void 0;
var numeric_range_1 = require("../../../utils/math/numeric-range");
var flatten_1 = require("../../../utils/array/flatten");
var merge_1 = require("../../../utils/set/merge");
var subtract_1 = require("../../../utils/set/subtract");
var add_classes_from_set_1 = require("../../../utils/dom/class/add-classes-from-set");
var remove_classes_from_set_1 = require("../../../utils/dom/class/remove-classes-from-set");
var AddClassAtPercent = (function () {
    function AddClassAtPercent(config, _a) {
        var _b = (_a === void 0 ? {} : _a).styleTarget, styleTarget = _b === void 0 ? null : _b;
        this.allClasses_ = AddClassAtPercent.extractAllClasses_(config);
        this.cssClassesByRange_ = AddClassAtPercent.generateClassesByRange_(config);
        this.styleTarget_ = styleTarget;
        this.destroyed_ = false;
    }
    AddClassAtPercent.extractAllClasses_ = function (config) {
        return new Set(flatten_1.flatten(config.map(function (_a) {
            var position = _a[0], cssClasses = _a[1];
            return cssClasses;
        })));
    };
    AddClassAtPercent.generateClassesByRange_ = function (config) {
        var result = [];
        var start = Number.NEGATIVE_INFINITY;
        var end = Number.NEGATIVE_INFINITY;
        var lastCssClasses = [];
        for (var keyframeIndex = 0; keyframeIndex < config.length; keyframeIndex++) {
            var keyframe = config[keyframeIndex];
            var position = keyframe[0];
            start = end;
            end = position;
            result.push([new numeric_range_1.NumericRange(start, end), new Set(lastCssClasses)]);
            lastCssClasses = keyframe[1];
        }
        start = end;
        end = Number.POSITIVE_INFINITY;
        result.push([new numeric_range_1.NumericRange(start, end), new Set(lastCssClasses)]);
        return result;
    };
    AddClassAtPercent.prototype.run = function (target, distance, distanceAsPercent) {
        if (this.destroyed_) {
            return;
        }
        var classesToAdd = merge_1.merge.apply(void 0, this.cssClassesByRange_
            .filter(function (_a) {
            var range = _a[0], cssClasses = _a[1];
            return range.contains(distanceAsPercent);
        })
            .map(function (_a) {
            var range = _a[0], cssClasses = _a[1];
            return cssClasses;
        }));
        var classesToRemove = subtract_1.subtract(this.allClasses_, classesToAdd);
        var styleTarget = this.styleTarget_ || target;
        add_classes_from_set_1.addClassesFromSet(styleTarget, classesToAdd);
        remove_classes_from_set_1.removeClassesFromSet(styleTarget, classesToRemove);
    };
    AddClassAtPercent.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return AddClassAtPercent;
}());
exports.AddClassAtPercent = AddClassAtPercent;
//# sourceMappingURL=add-class-at-percent.js.map