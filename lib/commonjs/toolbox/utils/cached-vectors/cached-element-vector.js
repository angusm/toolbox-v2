"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("../map/dynamic-default");
var multi_value_dynamic_default_1 = require("../map/multi-value-dynamic-default");
var vector_1 = require("../math/geometry/vector");
var render_loop_1 = require("../render-loop");
var service_1 = require("../error/service");
var VALUE_LIMIT = 2;
var caches = dynamic_default_1.DynamicDefaultMap.usingFunction(function (Class) {
    return multi_value_dynamic_default_1.MultiValueDynamicDefaultMap.usingFunction(function (args) { return new (Class.bind.apply(Class, [void 0].concat(args)))(); });
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
        if (instanceByElement.has([element].concat(args))) {
            if (element) {
                service_1.ErrorService.throw('Please use getForElement instead of new.');
            }
            else {
                service_1.ErrorService.throw('Please use getSingleton instead of new.');
            }
        }
        this.element = element;
        this.values =
            [new this.constructor.VectorClass()];
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
        return new ((_a = (this.getVectorClass())).bind.apply(_a, [void 0].concat(this.getValues())))();
    };
    CachedElementVector.prototype.getValueLimit_ = function () {
        return this.constructor.VALUE_LIMIT;
    };
    CachedElementVector.prototype.render = function () {
        var _this = this;
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
    CachedElementVector.getForElement = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return caches.get(this).get(args);
    };
    CachedElementVector.getSingleton = function (use) {
        var instance = caches.get(this).get([null]);
        uses.get(instance).add(use);
        return instance;
    };
    CachedElementVector.prototype.destroy = function (use) {
        uses.get(this).delete(use);
        if (uses.size <= 0) {
            caches.delete(this);
        }
    };
    CachedElementVector.VectorClass = vector_1.Vector;
    CachedElementVector.VALUE_LIMIT = VALUE_LIMIT;
    return CachedElementVector;
}());
exports.CachedElementVector = CachedElementVector;
//# sourceMappingURL=cached-element-vector.js.map