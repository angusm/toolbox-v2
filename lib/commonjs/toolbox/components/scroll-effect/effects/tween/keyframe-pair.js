"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../../../../utils/math/numeric-range");
var measurable_range_1 = require("../../../../utils/math/measurable-range");
var KeyframePair = (function () {
    function KeyframePair(keyframeA, keyframeB) {
        this.positionRange_
            = new numeric_range_1.NumericRange(keyframeA.getPosition(), keyframeB.getPosition());
        this.valueRange_ =
            new measurable_range_1.MeasurableRange(keyframeA.getValue(), keyframeB.getValue());
    }
    KeyframePair.prototype.containsPosition = function (position) {
        return this.positionRange_.contains(position);
    };
    KeyframePair.prototype.getValueAtPosition = function (position) {
        var percent = this.positionRange_.getValueAsPercent(position);
        return this.valueRange_.getPercentAsValue(percent);
    };
    KeyframePair.getValueFromRanges = function (position, keyframePairs) {
        return keyframePairs
            .find(function (keyframePair) { return keyframePair.containsPosition(position); })
            .getValueAtPosition(position);
    };
    KeyframePair.fromKeyframes = function (keyframes) {
        var sortedKeyframes = keyframes
            .sort(function (a, b) { return a.getPosition() - b.getPosition(); });
        var firstKeyframe = sortedKeyframes[0];
        var firstPair = new KeyframePair(firstKeyframe.setPosition(Number.NEGATIVE_INFINITY), firstKeyframe);
        var interstitialPairs = sortedKeyframes
            .slice(1)
            .map(function (a, index) {
            return new KeyframePair(sortedKeyframes[index], a);
        });
        var lastKeyframe = sortedKeyframes.slice(-1)[0];
        var lastPair = new KeyframePair(lastKeyframe, lastKeyframe.setPosition(Number.POSITIVE_INFINITY));
        return [firstPair].concat(interstitialPairs, [lastPair]);
    };
    return KeyframePair;
}());
exports.KeyframePair = KeyframePair;
//# sourceMappingURL=keyframe-pair.js.map