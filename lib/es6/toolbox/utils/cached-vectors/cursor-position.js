import { Vector2d } from '../math/geometry/vector-2d';
import { frame } from '../frame';
var CursorPosition = (function () {
    function CursorPosition(position, pressed) {
        this.position_ = position;
        this.pressed_ = pressed;
        this.frame_ = frame.getFrame();
        this.time_ = new Date();
    }
    CursorPosition.fromXY = function (x, y, pressed) {
        return new this(new Vector2d(x, y), pressed);
    };
    CursorPosition.prototype.getFrame = function () {
        return this.frame_;
    };
    CursorPosition.prototype.isForFrame = function () {
        var frames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            frames[_i] = arguments[_i];
        }
        return frames.indexOf(this.getFrame()) !== -1;
    };
    CursorPosition.prototype.isPressed = function () {
        return this.pressed_;
    };
    CursorPosition.prototype.getPosition = function () {
        return this.position_;
    };
    CursorPosition.prototype.getTime = function () {
        return this.time_;
    };
    return CursorPosition;
}());
export { CursorPosition };
//# sourceMappingURL=cursor-position.js.map