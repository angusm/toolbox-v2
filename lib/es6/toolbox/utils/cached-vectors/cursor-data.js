var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Vector2d } from '../math/geometry/vector-2d';
import { ZERO_VECTOR_2D } from '../math/geometry/zero-vector-2d';
import { frame } from '../frame';
import { filterUntilFirst } from '../array/filter-until-first';
import { filterUntilFalse } from '../array/filter-until-false';
import { CursorPosition } from './cursor-position';
var GESTURE_TIME_LIMIT = 1000;
var POSITION_LIMIT = 100;
var ZERO_POSITION = new CursorPosition(ZERO_VECTOR_2D, false);
var CursorData = (function () {
    function CursorData(currentPosition) {
        if (currentPosition === void 0) { currentPosition = ZERO_POSITION; }
        var pastPositions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            pastPositions[_i - 1] = arguments[_i];
        }
        this.positions_ = __spreadArrays([currentPosition], pastPositions);
    }
    CursorData.prototype.update = function (position) {
        return new (CursorData.bind.apply(CursorData, __spreadArrays([void 0, position], this.positions_.slice(0, POSITION_LIMIT - 1))))();
    };
    CursorData.prototype.getLatestPosition = function () {
        return this.positions_[0];
    };
    CursorData.prototype.getPosition = function () {
        return this.getLatestPosition().getPosition();
    };
    CursorData.prototype.getFrameDelta = function () {
        return this.getFrameDelta_(false);
    };
    CursorData.prototype.getPressedFrameDelta = function () {
        return this.getFrameDelta_(true);
    };
    CursorData.prototype.getFrameDelta_ = function (usePressedPositionsOnly) {
        var positions = this.getPositionsForFrameDelta_(usePressedPositionsOnly);
        return positions.length === 0 ?
            ZERO_VECTOR_2D : Vector2d.sumDeltas.apply(Vector2d, positions.map(function (position) { return position.getPosition(); }));
    };
    CursorData.prototype.getPositionsForFrameDelta_ = function (usePressedPositionsOnly) {
        var currentFrame = frame.getFrame();
        if (!this.getLatestPosition().isForFrame(currentFrame)) {
            return [];
        }
        var isPreviousFrame = function (position) { return !position.isForFrame(currentFrame); };
        var positionsToConsider = filterUntilFirst(this.positions_, isPreviousFrame);
        if (usePressedPositionsOnly) {
            var isPressed = function (position) { return position.isPressed(); };
            return filterUntilFalse(positionsToConsider, isPressed);
        }
        else {
            return positionsToConsider;
        }
    };
    CursorData.prototype.getGestureDelta = function () {
        return CursorData.getGestureDeltaFromPositions_.apply(CursorData, this.positions_);
    };
    CursorData.prototype.getPressedGestureDelta = function () {
        return CursorData.getGestureDeltaFromPositions_.apply(CursorData, this.getPressedGesturePositions_());
    };
    CursorData.prototype.getLastFrameVelocity = function () {
        var framesWithTimeDifference = this.getFramesWithTimeDifference_();
        var firstFrame = framesWithTimeDifference[0];
        var lastFrame = framesWithTimeDifference.slice(-1)[0];
        var frameDeltaInSeconds = (firstFrame.getTime().valueOf() - lastFrame.getTime().valueOf()) /
            1000;
        return this.getLastFrameDelta().scale(1 / frameDeltaInSeconds);
    };
    CursorData.prototype.getLastFrameDelta = function () {
        var framesWithTimeDifference = this.getFramesWithTimeDifference_();
        var firstFrame = framesWithTimeDifference[0];
        var lastFrame = framesWithTimeDifference.slice(-1)[0];
        return firstFrame.getPosition().subtract(lastFrame.getPosition());
    };
    CursorData.prototype.getFramesWithTimeDifference_ = function () {
        var firstPosition = this.positions_[0];
        var positionWithDifference = this.positions_
            .find(function (position) {
            return position.getTime().valueOf() !==
                firstPosition.getTime().valueOf();
        });
        return this.positions_
            .slice(0, this.positions_.indexOf(positionWithDifference) + 1);
    };
    CursorData.prototype.getPressedGesturePositions_ = function () {
        var currentTime = new Date().valueOf();
        var conditionFn = function (position) {
            var timeDiff = currentTime - position.getTime().valueOf();
            return timeDiff < GESTURE_TIME_LIMIT && position.isPressed();
        };
        return filterUntilFalse(this.positions_, conditionFn);
    };
    CursorData.getGestureDeltaFromPositions_ = function () {
        var positions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            positions[_i] = arguments[_i];
        }
        var deltas = Vector2d.getDeltas.apply(Vector2d, positions.map(function (position) { return position.getPosition(); }));
        var scaledDeltas = deltas.map(function (delta, index) { return delta.scale((deltas.length - index) / deltas.length); });
        return Vector2d.add.apply(Vector2d, scaledDeltas);
    };
    return CursorData;
}());
export { CursorData };
//# sourceMappingURL=cursor-data.js.map