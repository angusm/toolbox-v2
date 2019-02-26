"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var distance_function_1 = require("./distance-function");
var render_loop_1 = require("../../utils/render-loop");
var array_1 = require("../../utils/map/array");
var numeric_range_1 = require("../../utils/math/numeric-range");
var remove_first_instance_1 = require("../../utils/array/remove-first-instance");
var flatten_1 = require("../../utils/array/flatten");
var defaultOptions = {
    distanceCallbacks: [],
    percentCallbacks: [],
    getDistanceFunction: distance_function_1.DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: function () { return Number.NEGATIVE_INFINITY; },
    endDistance: function () { return Number.POSITIVE_INFINITY; },
    effects: [],
};
var ActiveEffects = new array_1.ArrayMap();
var ScrollEffectRunValue = (function () {
    function ScrollEffectRunValue(distance, distanceAsPercent, lastRunDistance, lastRunDistanceAsPercent) {
        this.distance = distance;
        this.distanceAsPercent = distanceAsPercent;
        this.lastRunDistance = lastRunDistance;
        this.lastRunDistanceAsPercent = lastRunDistanceAsPercent;
    }
    ScrollEffectRunValue.prototype.getRunRangeAsPercent = function () {
        return numeric_range_1.NumericRange.fromUnorderedValues(this.lastRunDistanceAsPercent, this.distanceAsPercent);
    };
    ScrollEffectRunValue.prototype.getRunRange = function () {
        return numeric_range_1.NumericRange.fromUnorderedValues(this.lastRunDistance, this.distance);
    };
    return ScrollEffectRunValue;
}());
var ScrollEffect = (function () {
    function ScrollEffect(target, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.distanceCallbacks, distanceCallbacks = _c === void 0 ? defaultOptions.distanceCallbacks : _c, _d = _b.percentCallbacks, percentCallbacks = _d === void 0 ? defaultOptions.percentCallbacks : _d, _e = _b.getDistanceFunction, getDistanceFunction = _e === void 0 ? defaultOptions.getDistanceFunction : _e, _f = _b.startDistance, startDistance = _f === void 0 ? defaultOptions.startDistance : _f, _g = _b.endDistance, endDistance = _g === void 0 ? defaultOptions.endDistance : _g, _h = _b.effects, effects = _h === void 0 ? defaultOptions.effects : _h;
        this.distanceCallbacks_ =
            ScrollEffect.mapCallbacksFromCallbackOptions_(distanceCallbacks);
        this.percentCallbacks_ =
            ScrollEffect.mapCallbacksFromCallbackOptions_(percentCallbacks);
        this.target_ = target;
        this.getDistanceFunction_ = getDistanceFunction;
        this.startDistance_ = startDistance;
        this.endDistance_ = endDistance;
        this.effects_ = effects;
        this.lastRunDistance_ = null;
        this.destroyed_ = false;
        this.init_();
    }
    ScrollEffect.prototype.init_ = function () {
        var _this = this;
        this.effects_.forEach(function (effect) { return ActiveEffects.get(effect).push(_this); });
        render_loop_1.renderLoop.measure(function () {
            var runValue = _this.getRunValue_();
            _this.runEffects_(runValue);
            _this.lastRunDistance_ = runValue.distance;
        });
        render_loop_1.renderLoop.scrollMeasure(function () { return _this.handleScroll_(); });
    };
    ScrollEffect.mapCallbacksFromCallbackOptions_ = function (callbacks) {
        var values = callbacks instanceof array_1.ArrayMap ?
            Array.from(callbacks.entries()) : callbacks;
        var parsedValues = values
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            if (key instanceof numeric_range_1.NumericRange) {
                return [key, value];
            }
            else if (key instanceof Array) {
                return ([new numeric_range_1.NumericRange(key[0], key[1]), value]);
            }
            else {
                return ([new numeric_range_1.NumericRange(key, key), value]);
            }
        });
        return new array_1.ArrayMap(parsedValues);
    };
    ScrollEffect.prototype.handleScroll_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.scrollMeasure(function () {
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.handleScroll_(); });
            var runValue = _this.getRunValue_();
            if (runValue.distance === runValue.lastRunDistance) {
                return;
            }
            _this.runEffects_(runValue);
            _this.runCallbacksForPosition_(runValue);
            _this.lastRunDistance_ = runValue.distance;
        });
    };
    ScrollEffect.prototype.getDistanceValue_ = function (value) {
        if (typeof value === 'number') {
            return value;
        }
        else {
            return value(this.target_);
        }
    };
    ScrollEffect.prototype.getStartDistance_ = function () {
        return this.getDistanceValue_(this.startDistance_);
    };
    ScrollEffect.prototype.getEndDistance_ = function () {
        return this.getDistanceValue_(this.endDistance_);
    };
    ScrollEffect.prototype.getDistanceRange_ = function () {
        return new numeric_range_1.NumericRange(this.getStartDistance_(), this.getEndDistance_());
    };
    ScrollEffect.getCallbacks = function (runRange, callbacksMap) {
        return flatten_1.flatten(Array.from(callbacksMap.entries())
            .filter(function (_a) {
            var triggerRange = _a[0], callbacks = _a[1];
            return triggerRange.getOverlap(runRange) !== null;
        })
            .map(function (_a) {
            var triggerRange = _a[0], callbacks = _a[1];
            return callbacks;
        }));
    };
    ScrollEffect.prototype.getRunValue_ = function () {
        var distance = this.getRunDistance_();
        var lastRunDistance = this.lastRunDistance_;
        var percent = this.getDistanceRange_().getValueAsPercent(distance);
        var lastRunDistancePercent = this.getDistanceRange_().getValueAsPercent(lastRunDistance);
        return new ScrollEffectRunValue(distance, percent, lastRunDistance, lastRunDistancePercent);
    };
    ScrollEffect.prototype.runCallbacks_ = function (callbacks, runValue) {
        var _this = this;
        callbacks
            .forEach(function (callback) { return callback(_this.target_, runValue.distance, runValue.distanceAsPercent, runValue.lastRunDistance, runValue.lastRunDistanceAsPercent); });
    };
    ScrollEffect.prototype.runCallbacksForPosition_ = function (runValue) {
        var percentCallbacksToRun = ScrollEffect.getCallbacks(runValue.getRunRangeAsPercent(), this.percentCallbacks_);
        var distanceCallbacksToRun = ScrollEffect.getCallbacks(runValue.getRunRange(), this.distanceCallbacks_);
        var allCallbacks = flatten_1.flatten([percentCallbacksToRun, distanceCallbacksToRun]);
        this.runCallbacks_(allCallbacks, runValue);
    };
    ScrollEffect.prototype.runEffects_ = function (runValue) {
        var effectsRunFns = this.effects_.map(function (effect) { return effect.run.bind(effect); });
        this.runCallbacks_(effectsRunFns, runValue);
    };
    ScrollEffect.prototype.getRunDistance_ = function () {
        return this.getDistanceRange_()
            .clamp(this.getDistanceFunction_(this.target_));
    };
    ScrollEffect.prototype.destroy = function () {
        var _this = this;
        this.destroyed_ = true;
        this.effects_
            .forEach(function (effect) {
            remove_first_instance_1.removeFirstInstance(ActiveEffects.get(effect), _this);
            if (ActiveEffects.get(effect).length === 0) {
                ActiveEffects.delete(effect);
                effect.destroy();
            }
        });
    };
    return ScrollEffect;
}());
exports.ScrollEffect = ScrollEffect;
//# sourceMappingURL=base.js.map