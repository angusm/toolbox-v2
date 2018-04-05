import { setStyle } from "./set-style";
var AbsolutePosition = (function () {
    function AbsolutePosition(top, right, bottom, left) {
        this.top_ = top;
        this.right_ = right;
        this.bottom_ = bottom;
        this.left_ = left;
    }
    Object.defineProperty(AbsolutePosition.prototype, "top", {
        get: function () {
            return this.top_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbsolutePosition.prototype, "right", {
        get: function () {
            return this.right_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbsolutePosition.prototype, "bottom", {
        get: function () {
            return this.bottom_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbsolutePosition.prototype, "left", {
        get: function () {
            return this.left_;
        },
        enumerable: true,
        configurable: true
    });
    AbsolutePosition.prototype.positionElement = function (targetElement) {
        setStyle(targetElement, 'top', this.top_);
        setStyle(targetElement, 'right', this.right_);
        setStyle(targetElement, 'bottom', this.bottom_);
        setStyle(targetElement, 'left', this.left_);
    };
    return AbsolutePosition;
}());
export { AbsolutePosition };
//# sourceMappingURL=absolute-position.js.map