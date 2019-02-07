import { Keyframe } from "./keyframe";
import { KeyframePair } from "./keyframe-pair";
import { ArrayMap } from "../../../../utils/map/array";
var Animation = (function () {
    function Animation(keyframes) {
        this.keyframePairsByProperty_ = Animation.pairKeyframes_(keyframes);
    }
    Animation.pairKeyframes_ = function (keyframes) {
        var mappedKeyframes = this.mapKeyframesByProperty_(keyframes);
        return Array.from(mappedKeyframes.entries())
            .reduce(function (map, _a) {
            var property = _a[0], keyframes = _a[1];
            map.set(property, KeyframePair.fromKeyframes(keyframes));
            return map;
        }, new ArrayMap());
    };
    Animation.mapKeyframesByProperty_ = function (keyframes) {
        return keyframes
            .reduce(function (map, keyframe) {
            map.get(keyframe.getProperty()).push(keyframe);
            return map;
        }, new ArrayMap());
    };
    Animation.prototype.getPropertyValueMapFromPosition = function (position) {
        var _this = this;
        var pairs = Array.from(this.keyframePairsByProperty_.keys())
            .map(function (property) {
            var keyframePairs = _this.keyframePairsByProperty_.get(property);
            var value = KeyframePair.getValueFromRanges(position, keyframePairs);
            return [property, value];
        });
        return new Map(pairs);
    };
    Animation.fromKeyframesConfig = function (config) {
        return new Animation(Keyframe.parseConfig(config));
    };
    return Animation;
}());
export { Animation };
//# sourceMappingURL=animation.js.map