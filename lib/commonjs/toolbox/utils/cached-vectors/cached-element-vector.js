"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("../map/dynamic-default");
var multi_value_dynamic_default_1 = require("../map/multi-value-dynamic-default");
var vector_1 = require("../math/geometry/vector");
var render_loop_1 = require("../render-loop");
var VALUE_LIMIT = 2;
var caches = dynamic_default_1.DynamicDefaultMap.usingFunction(function (Class) {
    return multi_value_dynamic_default_1.MultiValueDynamicDefaultMap.usingFunction(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new (Class.bind.apply(Class, [void 0].concat(args)))();
    });
});
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
                console.error('Please use getForElement instead of new.');
            }
            else {
                console.error('Please use getSingleton instead of new.');
            }
        }
        this.element = element;
        this.values = [new (this[Symbol.species].getVectorClass())()];
        this.init();
    }
    CachedElementVector.getVectorClass = function () {
        return vector_1.Vector;
    };
    CachedElementVector.prototype.init = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () { return _this.measureValues(); });
        this.render();
    };
    CachedElementVector.prototype.getLastValue = function () {
        return this.values.slice(-1)[0];
    };
    CachedElementVector.prototype.getValues = function () {
        console.error('getValues must be overridden by child class');
        return [];
    };
    CachedElementVector.prototype.getCurrentVector = function () {
        return new ((_a = (this[Symbol.species].getVectorClass())).bind.apply(_a, [void 0].concat(this.getValues())))();
        var _a;
    };
    CachedElementVector.prototype.render = function () {
        var _this = this;
        render_loop_1.renderLoop.premeasure(function () {
            _this.measureValues();
            render_loop_1.renderLoop.cleanup(function () { return _this.render(); });
        });
    };
    CachedElementVector.prototype.measureValues = function () {
        this.values =
            this.values
                .slice(-(this[Symbol.species].getValueLimit() - 1))
                .concat([this.getCurrentVector()]);
    };
    CachedElementVector.prototype.getCurrentAndLastValue = function () {
        return this.values.slice(-2);
    };
    CachedElementVector.prototype.getDelta = function () {
        var values = this.getCurrentAndLastValue();
        return this[Symbol.species].getVectorClass()
            .subtract(values[0], values[1]);
    };
    CachedElementVector.prototype.hasChanged = function () {
        return !(_a = this[Symbol.species].getVectorClass()).areEqual.apply(_a, this.getCurrentAndLastValue());
        var _a;
    };
    CachedElementVector.getValueLimit = function () {
        return VALUE_LIMIT;
    };
    CachedElementVector.getForElement = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return caches.get(this).get(args);
    };
    CachedElementVector.getSingleton = function () {
        return caches.get(this).get([null]);
    };
    Object.defineProperty(CachedElementVector.prototype, Symbol.species, {
        get: function () {
            return this.constructor;
        },
        enumerable: true,
        configurable: true
    });
    return CachedElementVector;
}());
exports.CachedElementVector = CachedElementVector;
//# sourceMappingURL=cached-element-vector.js.map