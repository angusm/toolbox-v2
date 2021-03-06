"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedElementVector = void 0;
var dynamic_default_1 = require("../map/dynamic-default");
var multi_value_dynamic_default_1 = require("../map/multi-value-dynamic-default");
var vector_1 = require("../math/geometry/vector");
var render_loop_1 = require("../render-loop");
var service_1 = require("../error/service");
var VALUE_LIMIT = 2;
var caches = dynamic_default_1.DynamicDefaultMap.usingFunction(function (Class) {
    return multi_value_dynamic_default_1.MultiValueDynamicDefaultMap.usingFunction(function (args) { return new (Class.bind.apply(Class, __spreadArrays([void 0], args)))(); });
});
var uses = dynamic_default_1.DynamicDefaultMap.usingFunction(function () { return new Set(); });
var CachedElementVector = (function () {
    function CachedElementVector(element) {
        if (element === void 0) { element = null; }
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var instanceByElement = caches.get(this.constructor);
        this.args_ = __spreadArrays([element], args);
        if (instanceByElement.has(__spreadArrays([element], args))) {
            if (element) {
                service_1.ErrorService.throw('Please use getForElement instead of new.');
            }
            else {
                service_1.ErrorService.throw('Please use getSingleton instead of new.');
            }
        }
        this.destroyTimeout_ = null;
        this.destroyed_ = false;
        this.element = element;
        this.values = [this.getCurrentVector_()];
        this.init();
    }
    CachedElementVector.prototype.getVectorClass = function () {
        return this.constructor.VectorClass;
    };
    CachedElementVector.prototype.init = function () {
        var _this = this;
        render_loop_1.renderLoop.anyPremeasure(function () { return _this.measureValues(); });
        this.render();
    };
    CachedElementVector.prototype.getLastValue = function () {
        return this.values.slice(-1)[0];
    };
    CachedElementVector.prototype.getValues = function () {
        service_1.ErrorService.throw('getValues must be overridden by child class');
        return [];
    };
    CachedElementVector.prototype.getCurrentVector_ = function () {
        var _a;
        return new ((_a = (this.getVectorClass())).bind.apply(_a, __spreadArrays([void 0], this.getValues())))();
    };
    CachedElementVector.prototype.getValueLimit_ = function () {
        return this.constructor.VALUE_LIMIT;
    };
    CachedElementVector.prototype.render = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        this.renderLoopPremeasure_(function () {
            _this.renderLoopCleanup_(function () { return _this.render(); });
            _this.measureValues();
        });
    };
    CachedElementVector.prototype.renderLoopCleanup_ = function (fn) {
        render_loop_1.renderLoop.anyCleanup(fn);
    };
    CachedElementVector.prototype.renderLoopPremeasure_ = function (fn) {
        render_loop_1.renderLoop.anyPremeasure(fn);
    };
    CachedElementVector.prototype.measureValues = function () {
        this.values =
            this.values
                .slice(-(this.getValueLimit_() - 1))
                .concat([this.getCurrentVector_()]);
    };
    CachedElementVector.prototype.getCurrentAndLastValue = function () {
        return this.values.slice(-2);
    };
    CachedElementVector.prototype.getDelta = function () {
        var values = this.getCurrentAndLastValue();
        return this.getVectorClass().subtract(values[0], values[1]);
    };
    CachedElementVector.prototype.hasChanged = function () {
        var _a;
        return !(_a = this.getVectorClass()).areEqual.apply(_a, this.getCurrentAndLastValue());
    };
    CachedElementVector.getForElement = function (use, args) {
        if (args === void 0) { args = [null]; }
        var instance = caches.get(this).get(args);
        uses.get(instance).add(use);
        return instance;
    };
    CachedElementVector.getSingleton = function (use) {
        return this.getForElement(use);
    };
    CachedElementVector.prototype.destroy = function (use) {
        var _this = this;
        uses.get(this).delete(use);
        clearTimeout(this.destroyTimeout_);
        this.destroyTimeout_ = window.setTimeout(function () {
            if (uses.size <= 0) {
                caches.get(_this.constructor).delete(_this.args_);
                _this.destroyed_ = true;
            }
        }, 1000);
    };
    CachedElementVector.VectorClass = vector_1.Vector;
    CachedElementVector.VALUE_LIMIT = VALUE_LIMIT;
    return CachedElementVector;
}());
exports.CachedElementVector = CachedElementVector;
//# sourceMappingURL=cached-element-vector.js.map