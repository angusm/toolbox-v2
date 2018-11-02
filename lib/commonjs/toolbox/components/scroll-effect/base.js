"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var distance_function_1 = require("./distance-function");
var render_loop_1 = require("../../utils/render-loop");
var range_1 = require("../../utils/math/range");
var defaultOptions = {
    getDistanceFunction: distance_function_1.DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: Number.NEGATIVE_INFINITY,
    endDistance: Number.POSITIVE_INFINITY,
    effects: [],
};
var ScrollEffect = (function () {
    function ScrollEffect(target, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.getDistanceFunction, getDistanceFunction = _c === void 0 ? defaultOptions.getDistanceFunction : _c, _d = _b.startDistance, startDistance = _d === void 0 ? defaultOptions.startDistance : _d, _e = _b.endDistance, endDistance = _e === void 0 ? defaultOptions.endDistance : _e, _f = _b.effects, effects = _f === void 0 ? defaultOptions.effects : _f;
        this.target_ = target;
        this.getDistanceFunction_ = getDistanceFunction;
        this.distanceRange_ = new range_1.Range(startDistance, endDistance);
        this.effects_ = effects;
        this.lastRunDistance_ = null;
        this.destroyed_ = false;
        this.init_();
    }
    ScrollEffect.prototype.init_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () { return _this.runEffect_(); });
        render_loop_1.renderLoop.scrollMeasure(function () { return _this.handleScroll_(); });
    };
    ScrollEffect.prototype.handleScroll_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.scrollMeasure(function () {
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.handleScroll_(); });
            _this.runEffect_();
        });
    };
    ScrollEffect.prototype.runEffect_ = function () {
        var _this = this;
        var distance = this.getRunDistance_();
        if (distance === this.lastRunDistance_) {
            return;
        }
        this.lastRunDistance_ = distance;
        var percent = this.distanceRange_.getValueAsPercent(distance);
        this.effects_
            .forEach(function (effect) { return effect.run(_this.target_, distance, percent); });
    };
    ScrollEffect.prototype.getRunDistance_ = function () {
        return this.distanceRange_.clamp(this.getDistanceFunction_(this.target_));
    };
    ScrollEffect.prototype.destroy = function () {
        this.destroyed_ = true;
        this.effects_.forEach(function (effect) { return effect.destroy(); });
    };
    return ScrollEffect;
}());
exports.ScrollEffect = ScrollEffect;
//# sourceMappingURL=base.js.map