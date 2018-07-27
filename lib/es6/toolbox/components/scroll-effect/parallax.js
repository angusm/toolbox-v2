import { RunOnScroll } from "../run-on-condition/scroll";
import { ParallaxDistanceFunction } from "./parallax-distance-function";
import { renderLoop } from "../../utils/render-loop";
import { Range } from "../../utils/math/range";
import { generateBasicParallaxEffect } from "./effect-functions/base-generator";
var defaultOptions = {
    getDistanceFunction: ParallaxDistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: -Number.MAX_VALUE,
    endDistance: Number.MAX_VALUE,
    effectFunctions: [generateBasicParallaxEffect(-.1)],
};
var Parallax = (function () {
    function Parallax(target, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.getDistanceFunction, getDistanceFunction = _c === void 0 ? defaultOptions.getDistanceFunction : _c, _d = _b.startDistance, startDistance = _d === void 0 ? defaultOptions.startDistance : _d, _e = _b.endDistance, endDistance = _e === void 0 ? defaultOptions.endDistance : _e, _f = _b.effectFunctions, effectFunctions = _f === void 0 ? defaultOptions.effectFunctions : _f;
        this.target_ = target;
        this.getDistanceFunction_ = getDistanceFunction;
        this.distanceRange_ = new Range(startDistance, endDistance);
        this.effectFunctions_ = effectFunctions;
        this.lastRunDistance_ = null;
        this.init_();
    }
    Parallax.prototype.init_ = function () {
        var _this = this;
        renderLoop.measure(function () { return _this.runEffect_(); });
        new RunOnScroll(function () { return _this.runEffect_(); });
    };
    Parallax.prototype.runEffect_ = function () {
        var _this = this;
        var distance = this.getRunDistance_();
        if (distance === this.lastRunDistance_) {
            return;
        }
        this.lastRunDistance_ = distance;
        var percent = this.distanceRange_.getValueAsPercent(distance);
        this.effectFunctions_
            .forEach(function (effectFunction) { return effectFunction(_this.target_, distance, percent); });
    };
    Parallax.prototype.getRunDistance_ = function () {
        return this.distanceRange_.clamp(this.getDistanceFunction_(this.target_));
    };
    return Parallax;
}());
export { Parallax };
//# sourceMappingURL=parallax.js.map