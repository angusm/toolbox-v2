import { DynamicDefaultMap } from '../map/dynamic-default';
import { MultiValueDynamicDefaultMap } from '../map/multi-value-dynamic-default';
import { Vector } from '../math/geometry/vector';
import { renderLoop } from '../render-loop';
var VALUE_LIMIT = 2;
var caches = DynamicDefaultMap.usingFunction(function (Class) {
    return MultiValueDynamicDefaultMap.usingFunction(function (args) { return new (Class.bind.apply(Class, [void 0].concat(args)))(); });
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
                throw new Error('Please use getForElement instead of new.');
            }
            else {
                throw new Error('Please use getSingleton instead of new.');
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
        renderLoop.measure(function () { return _this.measureValues(); });
        this.render();
    };
    CachedElementVector.prototype.getLastValue = function () {
        return this.values.slice(-1)[0];
    };
    CachedElementVector.prototype.getValues = function () {
        throw new Error('getValues must be overridden by child class');
    };
    CachedElementVector.prototype.getCurrentVector_ = function () {
        return new ((_a = (this.getVectorClass())).bind.apply(_a, [void 0].concat(this.getValues())))();
        var _a;
    };
    CachedElementVector.prototype.getValueLimit_ = function () {
        return this.constructor.VALUE_LIMIT;
    };
    CachedElementVector.prototype.render = function () {
        var _this = this;
        renderLoop.premeasure(function () {
            renderLoop.cleanup(function () { return _this.render(); });
            _this.measureValues();
        });
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
        return !(_a = this.getVectorClass()).areEqual.apply(_a, this.getCurrentAndLastValue());
        var _a;
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
    CachedElementVector.VectorClass = Vector;
    CachedElementVector.VALUE_LIMIT = VALUE_LIMIT;
    return CachedElementVector;
}());
export { CachedElementVector };
//# sourceMappingURL=cached-element-vector.js.map