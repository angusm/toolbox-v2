"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsolutePosition = void 0;
var set_style_1 = require("./set-style");
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbsolutePosition.prototype, "right", {
        get: function () {
            return this.right_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbsolutePosition.prototype, "bottom", {
        get: function () {
            return this.bottom_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbsolutePosition.prototype, "left", {
        get: function () {
            return this.left_;
        },
        enumerable: false,
        configurable: true
    });
    AbsolutePosition.prototype.positionElement = function (targetElement) {
        set_style_1.setStyle(targetElement, 'top', this.top_);
        set_style_1.setStyle(targetElement, 'right', this.right_);
        set_style_1.setStyle(targetElement, 'bottom', this.bottom_);
        set_style_1.setStyle(targetElement, 'left', this.left_);
    };
    return AbsolutePosition;
}());
exports.AbsolutePosition = AbsolutePosition;
//# sourceMappingURL=absolute-position.js.map