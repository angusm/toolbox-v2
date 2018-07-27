"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../run-on-condition/scroll");
var parallax_distance_function_1 = require("./parallax-distance-function");
var render_loop_1 = require("../../utils/render-loop");
var range_1 = require("../../utils/math/range");
var basic_parallax_1 = require("./effect-generators/basic-parallax");
var is_displayed_1 = require("../../utils/dom/style/is-displayed");
var defaultOptions = {
    getDistanceFunction: parallax_distance_function_1.ParallaxDistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: -Number.MAX_VALUE,
    endDistance: Number.MAX_VALUE,
    effectFunctions: [basic_parallax_1.generateBasicParallaxEffect(-.1)],
};
var Parallax = (function () {
    function Parallax(target, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.getDistanceFunction, getDistanceFunction = _c === void 0 ? defaultOptions.getDistanceFunction : _c, _d = _b.startDistance, startDistance = _d === void 0 ? defaultOptions.startDistance : _d, _e = _b.endDistance, endDistance = _e === void 0 ? defaultOptions.endDistance : _e, _f = _b.effectFunctions, effectFunctions = _f === void 0 ? defaultOptions.effectFunctions : _f;
        this.target_ = target;
        this.getDistanceFunction_ = getDistanceFunction;
        this.distanceRange_ = new range_1.Range(startDistance, endDistance);
        this.effectFunctions_ = effectFunctions;
        this.lastRunDistance_ = null;
        this.init_();
    }
    Parallax.prototype.init_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () { return _this.runEffect_(); });
        new scroll_1.RunOnScroll(function () { return _this.runEffect_(); });
    };
    Parallax.prototype.runEffect_ = function () {
        var _this = this;
        if (!is_displayed_1.isDisplayed(this.target_)) {
            return;
        }
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
exports.Parallax = Parallax;
//# sourceMappingURL=parallax.js.map