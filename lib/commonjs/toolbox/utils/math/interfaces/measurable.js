"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zip_1 = require("../../array/zip");
var sum_1 = require("../sum");
var subtract_1 = require("../subtract");
var get_shared_class_1 = require("../../inheritance/get-shared-class");
var MeasurableFunctions = (function () {
    function MeasurableFunctions() {
    }
    MeasurableFunctions.zipValues_ = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return zip_1.zip.apply(void 0, values.map(function (value) { return value.toNumbers(); }));
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
        var commonAncestorClass = get_shared_class_1.getSharedClass.apply(void 0, this.getClasses_.apply(this, values));
        return commonAncestorClass;
    };
    MeasurableFunctions.add = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var sums = this.zipValues_.apply(this, values).map(function (values) { return sum_1.sum.apply(void 0, values); });
        return (_a = this.getSharedClass.apply(this, values)).fromNumbers.apply(_a, sums);
    };
    MeasurableFunctions.subtract = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var differences = this.zipValues_.apply(this, values).map(function (values) { return subtract_1.subtract.apply(void 0, values); });
        return (_a = this.getSharedClass.apply(this, values)).fromNumbers.apply(_a, differences);
    };
    return MeasurableFunctions;
}());
exports.MeasurableFunctions = MeasurableFunctions;
//# sourceMappingURL=measurable.js.map