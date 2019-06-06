import { DistanceFunction } from "./distance-function";
import { renderLoop } from "../../utils/render-loop";
import { ArrayMap } from "../../utils/map/array";
import { NumericRange } from "../../utils/math/numeric-range";
import { removeFirstInstance } from "../../utils/array/remove-first-instance";
import { forEach } from "../../utils/iterable-iterator/for-each";
import { ROOT_ELEMENT } from "../../utils/dom/position/root-element";
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
    function ScrollEffectRunValue(distance, distanceAsPercent, lastRunValue) {
        this.distance = distance;
        this.distanceAsPercent = distanceAsPercent;
        this.clientHeight = ROOT_ELEMENT.clientHeight;
        this.clientWidth = ROOT_ELEMENT.clientWidth;
        this.lastRunValue = lastRunValue;
    }
    ScrollEffectRunValue.prototype.shouldTriggerRun = function () {
        return this.lastRunValue === null ||
            this.distance !== this.lastRunValue.distance ||
            this.clientHeight !== this.lastRunValue.clientHeight ||
            this.clientWidth !== this.lastRunValue.clientWidth;
    };
    ScrollEffectRunValue.prototype.getRunRangeAsPercent = function () {
        var lastDistanceAsPercent = this.lastRunValue !== null ? this.lastRunValue.distanceAsPercent : 0;
        return NumericRange.fromUnorderedValues(lastDistanceAsPercent, this.distanceAsPercent);
    };
    ScrollEffectRunValue.prototype.getRunRange = function () {
        var lastDistance = this.lastRunValue !== null ? this.lastRunValue.distance : 0;
        return NumericRange.fromUnorderedValues(lastDistance, this.distance);
    };
    return ScrollEffectRunValue;
}());
var ScrollEffect = (function () {
    function ScrollEffect(target, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.condition, condition = _c === void 0 ? defaultOptions.condition : _c, _d = _b.distanceCallbacks, distanceCallbacks = _d === void 0 ? defaultOptions.distanceCallbacks : _d, _e = _b.percentCallbacks, percentCallbacks = _e === void 0 ? defaultOptions.percentCallbacks : _e, _f = _b.getDistanceFunction, getDistanceFunction = _f === void 0 ? defaultOptions.getDistanceFunction : _f, _g = _b.startDistance, startDistance = _g === void 0 ? defaultOptions.startDistance : _g, _h = _b.endDistance, endDistance = _h === void 0 ? defaultOptions.endDistance : _h, _j = _b.effects, effects = _j === void 0 ? defaultOptions.effects : _j;
        if (target === null) {
            throw new Error('ScrollEffect requires a valid HTMLElement as a target');
        }
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
            renderLoop.measure(function () { return _this.triggerRun(); });
        }
        else {
            window.addEventListener('load', function () { return renderLoop.measure(function () { return _this.triggerRun(); }); });
        }
        renderLoop.scrollMeasure(function () { return _this.handleScroll_(); });
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
        renderLoop.scrollMeasure(function () {
            _this.triggerRun();
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
        return new NumericRange(this.getStartDistance_(), this.getEndDistance_());
    };
    ScrollEffect.getCallbacks_ = function (runRange, callbacksMap) {
        var result = [];
        var entries = callbacksMap.entries();
        forEach(entries, function (_a) {
            var triggerRange = _a[0], callbacks = _a[1];
            if (triggerRange.hasOverlap(runRange)) {
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
        var percentCallbacksToRun = ScrollEffect.getCallbacks_(this.runValue_.getRunRangeAsPercent(), this.percentCallbacks_);
        var distanceCallbacksToRun = ScrollEffect.getCallbacks_(this.runValue_.getRunRange(), this.distanceCallbacks_);
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