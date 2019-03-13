"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../../utils/math/geometry/vector-2d");
var apply_scroll_1 = require("../../utils/dom/position/apply-scroll");
var JsScroll = (function () {
    function JsScroll() {
        var _this = this;
        this.initializationCount_ = 0;
        this.wheelHandler_ = function (e) { return _this.scrollManually_(e); };
    }
    JsScroll.prototype.init = function () {
        if (this.initializationCount_ === 0) {
            window.addEventListener('wheel', this.wheelHandler_);
        }
        this.initializationCount_++;
    };
    JsScroll.prototype.scrollManually_ = function (e) {
        e.preventDefault();
        apply_scroll_1.applyScroll(vector_2d_1.Vector2d.fromWheelEvent(e));
    };
    JsScroll.prototype.destroy = function () {
        this.initializationCount_--;
        if (this.initializationCount_ === 0) {
            window.removeEventListener('wheel', this.wheelHandler_);
        }
    };
    return JsScroll;
}());
var jsScroll = new JsScroll();
exports.jsScroll = jsScroll;
//# sourceMappingURL=js-scroll.js.map