import { Keyframe } from "./keyframe";
import { KeyframePair } from "./keyframe-pair";
import { ArrayMap } from "../../../../utils/map/array";
var Animation = (function () {
    function Animation(keyframes) {
        this.keyframePairsByProperty_ = Animation.pairKeyframes_(keyframes);
    }
    Animation.pairKeyframes_ = function (keyframes) {
        var mappedKeyframes = this.mapKeyframesByProperty_(keyframes);
        var result = new ArrayMap();
        mappedKeyframes.forEach(function (keyframes, property) {
            result.set(property, KeyframePair.fromKeyframes(keyframes));
        });
        return result;
    };
    Animation.mapKeyframesByProperty_ = function (keyframes) {
        return keyframes
            .reduce(function (map, keyframe) {
            map.get(keyframe.getProperty()).push(keyframe);
            return map;
        }, new ArrayMap());
    };
    Animation.prototype.getPropertyValueMapFromPosition = function (position) {
        var pairs = [];
        this.keyframePairsByProperty_.forEach(function (keyframePairs, property) {
            pairs.push([
                property,
                KeyframePair.getValueFromRanges(position, keyframePairs)
            ]);
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