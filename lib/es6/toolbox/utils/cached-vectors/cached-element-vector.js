import { DynamicDefaultMap } from '../map/dynamic-default';
import { MultiValueDynamicDefaultMap } from '../map/multi-value-dynamic-default';
import { Vector } from '../math/geometry/vector';
import { renderLoop } from '../render-loop';
import { ErrorService } from "../error/service";
var VALUE_LIMIT = 2;
var caches = DynamicDefaultMap.usingFunction(function (Class) {
    return MultiValueDynamicDefaultMap.usingFunction(function (args) { return new (Class.bind.apply(Class, [void 0].concat(args)))(); });
});
var uses = DynamicDefaultMap.usingFunction(function () { return new Set(); });
var CachedElementVector = (function () {
    function CachedElementVector(element) {
        if (element === void 0) { element = null; }
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var instanceByElement = caches.get(this.constructor);
        this.args_ = [element].concat(args);
        if (instanceByElement.has([element].concat(args))) {
            if (element) {
                ErrorService.throw('Please use getForElement instead of new.');
            }
            else {
                ErrorService.throw('Please use getSingleton instead of new.');
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
        renderLoop.anyPremeasure(function () { return _this.measureValues(); });
        this.render();
    };
    CachedElementVector.prototype.getLastValue = function () {
        return this.values.slice(-1)[0];
    };
    CachedElementVector.prototype.getValues = function () {
        ErrorService.throw('getValues must be overridden by child class');
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
        if (this.destroyed_) {
            return;
        }
        this.renderLoopPremeasure_(function () {
            _this.renderLoopCleanup_(function () { return _this.render(); });
            _this.measureValues();
        });
    };
    CachedElementVector.prototype.renderLoopCleanup_ = function (fn) {
        renderLoop.anyCleanup(fn);
    };
    CachedElementVector.prototype.renderLoopPremeasure_ = function (fn) {
        renderLoop.anyPremeasure(fn);
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
        var instance = caches.get(this).get(args);
        uses.get(instance).add(use);
        return instance;
    };
    CachedElementVector.getSingleton = function (use) {
        return this.getForElement(use, [null]);
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
        }, 100);
    };
    CachedElementVector.VectorClass = Vector;
    CachedElementVector.VALUE_LIMIT = VALUE_LIMIT;
    return CachedElementVector;
}());
export { CachedElementVector };
//# sourceMappingURL=cached-element-vector.js.map