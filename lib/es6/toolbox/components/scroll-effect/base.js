import { DistanceFunction } from "./distance-function";
import { renderLoop } from "../../utils/render-loop";
import { ArrayMap } from "../../utils/map/array";
import { NumericRange } from "../../utils/math/numeric-range";
import { removeFirstInstance } from "../../utils/array/remove-first-instance";
var defaultOptions = {
    getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: function () { return Number.NEGATIVE_INFINITY; },
    endDistance: function () { return Number.POSITIVE_INFINITY; },
    effects: [],
};
var ActiveEffects = new ArrayMap();
var ScrollEffect = (function () {
    function ScrollEffect(target, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.getDistanceFunction, getDistanceFunction = _c === void 0 ? defaultOptions.getDistanceFunction : _c, _d = _b.startDistance, startDistance = _d === void 0 ? defaultOptions.startDistance : _d, _e = _b.endDistance, endDistance = _e === void 0 ? defaultOptions.endDistance : _e, _f = _b.effects, effects = _f === void 0 ? defaultOptions.effects : _f;
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
        renderLoop.measure(function () { return _this.runEffect_(); });
        renderLoop.scrollMeasure(function () { return _this.handleScroll_(); });
    };
    ScrollEffect.prototype.handleScroll_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.scrollMeasure(function () {
            renderLoop.scrollCleanup(function () { return _this.handleScroll_(); });
            _this.runEffect_();
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
        return new NumericRange(this.getStartDistance_(), this.getEndDistance_());
    };
    ScrollEffect.prototype.runEffect_ = function () {
        var _this = this;
        var distance = this.getRunDistance_();
        if (distance === this.lastRunDistance_) {
            return;
        }
        this.lastRunDistance_ = distance;
        var percent = this.getDistanceRange_().getValueAsPercent(distance);
        this.effects_
            .forEach(function (effect) { return effect.run(_this.target_, distance, percent); });
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