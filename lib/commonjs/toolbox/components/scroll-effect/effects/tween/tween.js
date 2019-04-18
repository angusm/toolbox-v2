"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../../utils/render-loop");
var set_style_1 = require("../../../../utils/dom/style/set-style");
var animation_1 = require("./animation");
var keyframe_style_1 = require("./keyframe-style");
var defaultOptions = {
    easingFunction: function (distanceAsPercent) { return distanceAsPercent; },
    keyframeStyle: keyframe_style_1.KeyframeStyle.PERCENT,
    styleTarget: null,
};
var Tween = (function () {
    function Tween(keyframes, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.easingFunction, easingFunction = _c === void 0 ? defaultOptions.easingFunction : _c, _d = _b.keyframeStyle, keyframeStyle = _d === void 0 ? defaultOptions.keyframeStyle : _d, _e = _b.styleTarget, styleTarget = _e === void 0 ? defaultOptions.styleTarget : _e;
        this.animation_ = animation_1.Animation.fromKeyframesConfig(keyframes);
        this.styleTarget_ = styleTarget;
        this.cachedGetDistanceFn_ =
            keyframeStyle === keyframe_style_1.KeyframeStyle.PERCENT ?
                function (distanceAsPx, distanceAsPercent) {
                    return easingFunction(distanceAsPercent);
                } :
                function (distanceAsPx, distanceAsPercent) { return distanceAsPx; };
    }
    Tween.prototype.run = function (target, rawDistance, distanceAsPercent) {
        var distance = this.cachedGetDistanceFn_(rawDistance, distanceAsPercent);
        var propertyValueMap = this.animation_.getPropertyValueMapFromPosition(distance);
        var styleTarget = this.styleTarget_ === null ? target : this.styleTarget_;
        render_loop_1.renderLoop.anyMutate(function () {
            propertyValueMap.forEach(function (value, property) {
                set_style_1.setStyle(styleTarget, property, value.toStyleString());
            });
        });
    };
    Tween.prototype.destroy = function () { };
    return Tween;
}());
exports.Tween = Tween;
//# sourceMappingURL=tween.js.map