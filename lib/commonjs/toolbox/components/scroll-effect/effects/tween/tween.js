"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../../utils/render-loop");
var set_style_1 = require("../../../../utils/dom/style/set-style");
var animation_1 = require("./animation");
var keyframe_style_1 = require("./keyframe-style");
var defaultOptions = {
    keyframeStyle: keyframe_style_1.KeyframeStyle.PERCENT,
    styleTarget: null,
};
var Tween = (function () {
    function Tween(keyframes, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.keyframeStyle, keyframeStyle = _c === void 0 ? defaultOptions.keyframeStyle : _c, _d = _b.styleTarget, styleTarget = _d === void 0 ? defaultOptions.styleTarget : _d;
        this.animation_ = animation_1.Animation.fromKeyframesConfig(keyframes);
        this.keyframeStyle_ = keyframeStyle;
        this.styleTarget_ = styleTarget;
    }
    Tween.prototype.getDistance_ = function (distanceAsPx, distanceAsPercent) {
        if (this.keyframeStyle_ === keyframe_style_1.KeyframeStyle.PERCENT) {
            return distanceAsPercent;
        }
        else {
            return distanceAsPx;
        }
    };
    Tween.prototype.run = function (target, rawDistance, distanceAsPercent) {
        var distance = this.getDistance_(rawDistance, distanceAsPercent);
        var propertyValueMap = this.animation_.getPropertyValueMapFromPosition(distance);
        var styleTarget = this.styleTarget_ === null ? target : this.styleTarget_;
        render_loop_1.renderLoop.anyMutate(function () {
            Array.from(propertyValueMap.entries())
                .forEach(function (_a) {
                var property = _a[0], value = _a[1];
                set_style_1.setStyle(styleTarget, property, value.toStyleString());
            });
        });
    };
    Tween.prototype.destroy = function () { };
    return Tween;
}());
exports.Tween = Tween;
//# sourceMappingURL=tween.js.map