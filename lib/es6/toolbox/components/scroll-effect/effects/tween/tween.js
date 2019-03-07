import { renderLoop } from "../../../../utils/render-loop";
import { setStyle } from "../../../../utils/dom/style/set-style";
import { Animation } from "./animation";
import { KeyframeStyle } from "./keyframe-style";
var defaultOptions = {
    keyframeStyle: KeyframeStyle.PERCENT,
    styleTarget: null,
};
var Tween = (function () {
    function Tween(keyframes, _a) {
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.keyframeStyle, keyframeStyle = _c === void 0 ? defaultOptions.keyframeStyle : _c, _d = _b.styleTarget, styleTarget = _d === void 0 ? defaultOptions.styleTarget : _d;
        this.animation_ = Animation.fromKeyframesConfig(keyframes);
        this.styleTarget_ = styleTarget;
        this.cachedGetDistanceFn_ =
            keyframeStyle === KeyframeStyle.PERCENT ?
                function (distanceAsPx, distanceAsPercent) { return distanceAsPercent; } :
                function (distanceAsPx, distanceAsPercent) { return distanceAsPx; };
    }
    Tween.prototype.run = function (target, rawDistance, distanceAsPercent) {
        var distance = this.cachedGetDistanceFn_(rawDistance, distanceAsPercent);
        var propertyValueMap = this.animation_.getPropertyValueMapFromPosition(distance);
        var styleTarget = this.styleTarget_ === null ? target : this.styleTarget_;
        renderLoop.anyMutate(function () {
            propertyValueMap.forEach(function (value, property) {
                setStyle(styleTarget, property, value.toStyleString());
            });
        });
    };
    Tween.prototype.destroy = function () { };
    return Tween;
}());
export { Tween };
//# sourceMappingURL=tween.js.map