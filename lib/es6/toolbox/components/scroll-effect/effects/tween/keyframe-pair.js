var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { NumericRange } from "../../../../utils/math/numeric-range";
import { MeasurableRange } from "../../../../utils/math/measurable-range";
var KeyframePair = (function () {
    function KeyframePair(keyframeA, keyframeB) {
        this.positionRange_
            = new NumericRange(keyframeA.getPosition(), keyframeB.getPosition());
        this.keyframeA_ = keyframeA;
        this.keyframeB_ = keyframeB;
        this.getValueRange_ =
            KeyframePair.createGetValueRangeFunction_(keyframeA, keyframeB);
    }
    KeyframePair.prototype.containsPosition = function (position) {
        return this.positionRange_.contains(position);
    };
    KeyframePair.prototype.getValueAtPosition = function (position) {
        var percent;
        if (this.positionRange_.getMin() === Number.NEGATIVE_INFINITY) {
            percent = 0;
        }
        else if (this.positionRange_.getMax() === Number.POSITIVE_INFINITY) {
            percent = 100;
        }
        else {
            percent = this.positionRange_.getValueAsPercent(position);
        }
        return (this.getValueRange_().getPercentAsValue(percent));
    };
    KeyframePair.createGetValueRangeFunction_ = function (keyframeA, keyframeB) {
        if (keyframeA.isDynamicValue() || keyframeB.isDynamicValue()) {
            return function () {
                return new MeasurableRange(keyframeA.getValue(keyframeB), keyframeB.getValue(keyframeA));
            };
        }
        else {
            var measurableRange_1 = new MeasurableRange(keyframeA.getValue(keyframeB), keyframeB.getValue(keyframeA));
            return function () { return measurableRange_1; };
        }
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
        return __spreadArrays([firstPair], interstitialPairs, [lastPair]);
    };
    return KeyframePair;
}());
export { KeyframePair };
//# sourceMappingURL=keyframe-pair.js.map