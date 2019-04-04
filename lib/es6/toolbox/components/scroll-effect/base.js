import { DistanceFunction } from "./distance-function";
import { renderLoop } from "../../utils/render-loop";
import { ArrayMap } from "../../utils/map/array";
import { NumericRange } from "../../utils/math/numeric-range";
import { removeFirstInstance } from "../../utils/array/remove-first-instance";
import { flatten } from "../../utils/array/flatten";
import { Dimensions } from "../../utils/cached-vectors/dimensions";
var windowDimensions = Dimensions.getSingleton();
var defaultOptions = {
    condition: null,
    distanceCallbacks: [],
    percentCallbacks: [],
    getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: function () { return Number.NEGATIVE_INFINITY; },
    endDistance: function () { return Number.POSITIVE_INFINITY; },
    effects: [],
};
var ActiveEffects = new ArrayMap();
var ScrollEffectRunValue = (function () {
    function ScrollEffectRunValue(distance, distanceAsPercent, lastRunDistance, lastRunDistanceAsPercent) {
        this.distance = distance;
        this.distanceAsPercent = distanceAsPercent;
        this.lastRunDistance = lastRunDistance;
        this.lastRunDistanceAsPercent = lastRunDistanceAsPercent;
    }
    ScrollEffectRunValue.prototype.getRunRangeAsPercent = function () {
        return NumericRange.fromUnorderedValues(this.lastRunDistanceAsPercent, this.distanceAsPercent);
    };
    ScrollEffectRunValue.prototype.getRunRange = function () {
        return NumericRange.fromUnorderedValues(this.lastRunDistance, this.distance);
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
        this.lastRunDistance_ = null;
        this.destroyed_ = false;
        this.forceRun_ = false;
        this.init_();
    }
    ScrollEffect.prototype.init_ = function () {
        var _this = this;
        this.effects_.forEach(function (effect) { return ActiveEffects.get(effect).push(_this); });
        renderLoop.measure(function () {
            var runValue = _this.getRunValue_();
            if (_this.shouldRun_(runValue)) {
                _this.runEffectsAndCallbacks_(runValue);
            }
            _this.lastRunDistance_ = runValue.distance;
        });
        renderLoop.scrollMeasure(function () { return _this.handleScroll_(); });
        window.addEventListener('load', function () { return _this.triggerRun(); });
    };
    ScrollEffect.mapCallbacksFromCallbackOptions_ = function (callbacks) {
        var values = callbacks instanceof ArrayMap ?
            Array.from(callbacks.entries()) : callbacks;
        var parsedValues = values
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            if (key instanceof NumericRange) {
                return [key, value];
            }
            else if (key instanceof Array) {
                return ([new NumericRange(key[0], key[1]), value]);
            }
            else {
                return ([new NumericRange(key, key), value]);
            }
        });
        return new ArrayMap(parsedValues);
    };
    ScrollEffect.prototype.handleScroll_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        this.triggerRun();
        renderLoop.scrollMeasure(function () {
            renderLoop.scrollCleanup(function () { return _this.handleScroll_(); });
        });
    };
    ScrollEffect.prototype.forceRun = function () {
        var _this = this;
        if (this.forceRun_) {
            return;
        }
        this.forceRun_ = true;
        this.triggerRun();
        renderLoop.cleanup(function () { return _this.forceRun_ = false; });
    };
    ScrollEffect.prototype.triggerRun = function () {
        var _this = this;
        renderLoop.measure(function () {
            var runValue = _this.getRunValue_();
            if (_this.shouldRun_(runValue)) {
                _this.runEffectsAndCallbacks_(runValue);
            }
            _this.lastRunDistance_ = runValue.distance;
        });
    };
    ScrollEffect.prototype.runEffectsAndCallbacks_ = function (runValue) {
        this.runEffects_(runValue);
        this.runCallbacksForPosition_(runValue);
    };
    ScrollEffect.prototype.shouldRun_ = function (optionalRunValue) {
        if (this.forceRun_) {
            return true;
        }
        if (windowDimensions.hasChanged()) {
            return this.isConditionMet_();
        }
        var runValue = optionalRunValue || this.getRunValue_();
        return runValue.distance !== runValue.lastRunDistance && (this.isConditionMet_());
    };
    ScrollEffect.prototype.isConditionMet_ = function () {
        return this.condition_ === null || this.condition_();
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
        return new NumericRange(this.getStartDistance_(), this.getEndDistance_());
    };
    ScrollEffect.getCallbacks = function (runRange, callbacksMap) {
        return flatten(Array.from(callbacksMap.entries())
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
        var rawPercent = this.getDistanceRange_().getValueAsPercent(distance);
        var percent = isNaN(rawPercent) ? 0 : rawPercent;
        var lastRunDistancePercent = lastRunDistance !== null ?
            this.getDistanceRange_().getValueAsPercent(lastRunDistance) : 0;
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
        var allCallbacks = flatten([percentCallbacksToRun, distanceCallbacksToRun]);
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
            removeFirstInstance(ActiveEffects.get(effect), _this);
            if (ActiveEffects.get(effect).length === 0) {
                ActiveEffects.delete(effect);
                effect.destroy();
            }
        });
    };
    return ScrollEffect;
}());
export { ScrollEffect };
//# sourceMappingURL=base.js.map