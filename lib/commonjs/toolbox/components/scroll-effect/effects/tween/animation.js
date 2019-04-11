"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keyframe_1 = require("./keyframe");
var keyframe_pair_1 = require("./keyframe-pair");
var array_1 = require("../../../../utils/map/array");
var Animation = (function () {
    function Animation(keyframes) {
        this.keyframePairsByProperty_ = Animation.pairKeyframes_(keyframes);
    }
    Animation.pairKeyframes_ = function (keyframes) {
        var mappedKeyframes = this.mapKeyframesByProperty_(keyframes);
        var result = new array_1.ArrayMap();
        mappedKeyframes.forEach(function (keyframes, property) {
            result.set(property, keyframe_pair_1.KeyframePair.fromKeyframes(keyframes));
        });
        return result;
    };
    Animation.mapKeyframesByProperty_ = function (keyframes) {
        return keyframes
            .reduce(function (map, keyframe) {
            map.get(keyframe.getProperty()).push(keyframe);
            return map;
        }, new array_1.ArrayMap());
    };
    Animation.prototype.getPropertyValueMapFromPosition = function (position) {
        var result = new Map();
        this.keyframePairsByProperty_.forEach(function (keyframePairs, property) {
            result.set(property, keyframe_pair_1.KeyframePair.getValueFromRanges(position, keyframePairs));
        });
        return result;
    };
    Animation.fromKeyframesConfig = function (config) {
        return new Animation(keyframe_1.Keyframe.parseConfig(config));
    };
    return Animation;
}());
exports.Animation = Animation;
//# sourceMappingURL=animation.js.map