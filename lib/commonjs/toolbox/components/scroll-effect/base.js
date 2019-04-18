"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var distance_function_1 = require("./distance-function");
var render_loop_1 = require("../../utils/render-loop");
var array_1 = require("../../utils/map/array");
var numeric_range_1 = require("../../utils/math/numeric-range");
var remove_first_instance_1 = require("../../utils/array/remove-first-instance");
var for_each_1 = require("../../utils/iterable-iterator/for-each");
var defaultOptions = {
    condition: null,
    distanceCallbacks: [],
    percentCallbacks: [],
    getDistanceFunction: distance_function_1.DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: function () { return Number.NEGATIVE_INFINITY; },
    endDistance: function () { return Number.POSITIVE_INFINITY; },
    effects: [],
};
var ActiveEffects = new array_1.ArrayMap();
var ScrollEffectRunValue = (function () {
    function ScrollEffectRunValue(distance, distanceAsPercent, lastRunValue) {
        this.distance = distance;
        this.distanceAsPercent = distanceAsPercent;
        this.windowInnerHeight = window.innerHeight;
        this.windowInnerWidth = window.innerWidth;
        this.lastRunValue = lastRunValue;
    }
    ScrollEffectRunValue.prototype.shouldTriggerRun = function () {
        return this.lastRunValue === null ||
            this.distance !== this.lastRunValue.distance ||
            this.windowInnerHeight !== this.lastRunValue.windowInnerHeight ||
            this.windowInnerWidth !== this.lastRunValue.windowInnerWidth;
    };
    ScrollEffectRunValue.prototype.getRunRangeAsPercent = function () {
        var lastDistanceAsPercent = this.lastRunValue !== null ? this.lastRunValue.distanceAsPercent : 0;
        return numeric_range_1.NumericRange.fromUnorderedValues(lastDistanceAsPercent, this.distanceAsPercent);
    };
    ScrollEffectRunValue.prototype.getRunRange = function () {
        var lastDistance = this.lastRunValue !== null ? this.lastRunValue.distance : 0;
        return numeric_range_1.NumericRange.fromUnorderedValues(lastDistance, this.distance);
    };
    return ScrollEffectRunValue;
}());
var ScrollEffect = (function () {
    function ScrollEffect(target, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.condition, condition = _c === void 0 ? defaultOptions.condition : _c, _d = _b.distanceCallbacks, distanceCallbacks = _d === void 0 ? defaultOptions.distanceCallbacks : _d, _e = _b.percentCallbacks, percentCallbacks = _e === void 0 ? defaultOptions.percentCallbacks : _e, _f = _b.getDistanceFunction, getDistanceFunction = _f === void 0 ? defaultOptions.getDistanceFunction : _f, _g = _b.startDistance, startDistance = _g === void 0 ? defaultOptions.startDistance : _g, _h = _b.endDistance, endDistance = _h === void 0 ? defaultOptions.endDistance : _h, _j = _b.effects, effects = _j === void 0 ? defaultOptions.effects : _j;
        this.condition_ = condition;
        this.distanceCallbacks_ =
            ScrollEffect.mapCallbacksFromCallbackOptions_(distanceCallbacks);
        this.percentCallbacks_ =
            ScrollEffect.mapCallbacksFromCallbackOptions_(percentCallbacks);
        this.target_ = target;
        this.getDistanceFunction_ = getDistanceFunction;
        this.startDistance_ = startDistance;
        this.endDistance_ = endDistance;
        this.effects_ = effects;
        this.runValue_ = null;
        this.destroyed_ = false;
        this.forceRun_ = false;
        this.init_();
    }
    ScrollEffect.prototype.init_ = function () {
        var _this = this;
        this.effects_.forEach(function (effect) { return ActiveEffects.get(effect).push(_this); });
        if (document.readyState === 'complete') {
            render_loop_1.renderLoop.measure(function () { return _this.triggerRun(); });
        }
        else {
            window.addEventListener('load', function () { return render_loop_1.renderLoop.measure(function () { return _this.triggerRun(); }); });
        }
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
            _this.triggerRun();
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.handleScroll_(); });
        });
    };
    ScrollEffect.prototype.forceRun = function () {
        var _this = this;
        if (this.forceRun_) {
            return;
        }
        this.forceRun_ = true;
        this.triggerRun();
        render_loop_1.renderLoop.cleanup(function () { return _this.forceRun_ = false; });
    };
    ScrollEffect.prototype.triggerRun = function () {
        this.updateRunValue_();
        if (this.shouldRun_()) {
            this.runEffects_();
            this.runCallbacksForPosition_();
        }
    };
    ScrollEffect.prototype.shouldRun_ = function () {
        if (this.forceRun_) {
            return true;
        }
        return this.isConditionMet_() && this.runValue_.shouldTriggerRun();
    };
    ScrollEffect.prototype.isConditionMet_ = function () {
        return this.condition_ === null || this.condition_();
    };
    ScrollEffect.prototype.getDistanceValue_ = function (value) {
        return typeof value === 'number' ? value : value(this.target_);
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
        var result = [];
        var entries = callbacksMap.entries();
        for_each_1.forEach(entries, function (_a) {
            var triggerRange = _a[0], callbacks = _a[1];
            if (triggerRange.getOverlap(runRange) !== null) {
                result.push.apply(result, callbacks);
            }
        });
        return result;
    };
    ScrollEffect.prototype.updateRunValue_ = function () {
        var distance = this.getRunDistance_();
        var rawPercent = this.getDistanceRange_().getValueAsPercent(distance);
        var percent = isNaN(rawPercent) ? 0 : rawPercent;
        this.runValue_ =
            new ScrollEffectRunValue(distance, percent, this.runValue_);
    };
    ScrollEffect.prototype.runCallbacks_ = function (callbacks) {
        var _this = this;
        var lastRunValue = this.runValue_.lastRunValue;
        var lastDistance = lastRunValue !== null ? lastRunValue.distance : null;
        var lastDistanceAsPercent = lastRunValue !== null ? lastRunValue.distanceAsPercent : null;
        callbacks
            .forEach(function (callback) { return callback(_this.target_, _this.runValue_.distance, _this.runValue_.distanceAsPercent, lastDistance, lastDistanceAsPercent); });
    };
    ScrollEffect.prototype.runCallbacksForPosition_ = function () {
        var percentCallbacksToRun = ScrollEffect.getCallbacks(this.runValue_.getRunRangeAsPercent(), this.percentCallbacks_);
        var distanceCallbacksToRun = ScrollEffect.getCallbacks(this.runValue_.getRunRange(), this.distanceCallbacks_);
        this.runCallbacks_(percentCallbacksToRun.concat(distanceCallbacksToRun));
    };
    ScrollEffect.prototype.runEffects_ = function () {
        var effectsRunFns = this.effects_.map(function (effect) { return effect.run.bind(effect); });
        this.runCallbacks_(effectsRunFns);
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