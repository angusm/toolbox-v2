import { zip } from "../../array/zip";
import { sum } from "../sum";
import { subtract } from "../subtract";
import { getSharedClass } from "../../inheritance/get-shared-class";
var MeasurableFunctions = (function () {
    function MeasurableFunctions() {
    }
    MeasurableFunctions.zipValues_ = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return zip.apply(void 0, values.map(function (value) { return value.toNumbers(); }));
    };
    MeasurableFunctions.getClasses_ = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return values.map(function (value) { return value.constructor; });
    };
    MeasurableFunctions.getSharedClass = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var commonAncestorClass = getSharedClass.apply(void 0, this.getClasses_.apply(this, values));
        return commonAncestorClass;
    };
    MeasurableFunctions.add = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var sums = this.zipValues_.apply(this, values).map(function (values) { return sum.apply(void 0, values); });
        return (_a = this.getSharedClass.apply(this, values)).fromNumbers.apply(_a, sums);
    };
    MeasurableFunctions.subtract = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var differences = this.zipValues_.apply(this, values).map(function (values) { return subtract.apply(void 0, values); });
        return (_a = this.getSharedClass.apply(this, values)).fromNumbers.apply(_a, differences);
    };
    return MeasurableFunctions;
}());
export { MeasurableFunctions };
//# sourceMappingURL=measurable.js.map