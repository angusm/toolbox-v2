import { NumericRange } from "../../../utils/math/numeric-range";
import { flatten } from "../../../utils/array/flatten";
import { merge } from "../../../utils/set/merge";
import { subtract } from "../../../utils/set/subtract";
import { addClassesFromSet } from "../../../utils/dom/class/add-classes-from-set";
import { removeClassesFromSet } from "../../../utils/dom/class/remove-classes-from-set";
var AddClassAtPercent = (function () {
    function AddClassAtPercent(config, _a) {
        var _b = (_a === void 0 ? {} : _a).styleTarget, styleTarget = _b === void 0 ? null : _b;
        this.allClasses_ = AddClassAtPercent.extractAllClasses_(config);
        this.cssClassesByRange_ = AddClassAtPercent.generateClassesByRange_(config);
        this.styleTarget_ = styleTarget;
        this.destroyed_ = false;
    }
    AddClassAtPercent.extractAllClasses_ = function (config) {
        return new Set(flatten(config.map(function (_a) {
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
            result.push([new NumericRange(start, end), new Set(lastCssClasses)]);
            lastCssClasses = keyframe[1];
        }
        start = end;
        end = Number.POSITIVE_INFINITY;
        result.push([new NumericRange(start, end), new Set(lastCssClasses)]);
        return result;
    };
    AddClassAtPercent.prototype.run = function (target, distance, distanceAsPercent) {
        if (this.destroyed_) {
            return;
        }
        var classesToAdd = merge.apply(void 0, this.cssClassesByRange_
            .filter(function (_a) {
            var range = _a[0], cssClasses = _a[1];
            return range.contains(distanceAsPercent);
        })
            .map(function (_a) {
            var range = _a[0], cssClasses = _a[1];
            return cssClasses;
        }));
        var classesToRemove = subtract(this.allClasses_, classesToAdd);
        var styleTarget = this.styleTarget_ || target;
        addClassesFromSet(styleTarget, classesToAdd);
        removeClassesFromSet(styleTarget, classesToRemove);
    };
    AddClassAtPercent.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return AddClassAtPercent;
}());
export { AddClassAtPercent };
//# sourceMappingURL=add-class-at-percent.js.map