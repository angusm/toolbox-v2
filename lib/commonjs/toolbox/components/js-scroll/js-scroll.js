"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../../utils/math/geometry/vector-2d");
var apply_scroll_1 = require("../../utils/dom/position/apply-scroll");
var user_agent_1 = require("../../utils/user-agent/user-agent");
var ie_1 = require("../../utils/user-agent/browser/ie");
var thirdEventListenerParam = user_agent_1.UserAgent.getBrowser() === ie_1.IE ?
    true : { passive: false, capture: true, once: false };
var JsScroll = (function () {
    function JsScroll() {
        var _this = this;
        this.initializationCount_ = 0;
        this.wheelHandler_ = function (e) { return _this.scrollManually_(e); };
    }
    JsScroll.prototype.init = function () {
        var _this = this;
        if (this.initializationCount_ === 0) {
            if (document.readyState === 'complete') {
                this.addEventListener_();
            }
            else {
                window.addEventListener('load', function () { return _this.addEventListener_(); });
            }
        }
        this.initializationCount_++;
    };
    JsScroll.prototype.addEventListener_ = function () {
        window.addEventListener('wheel', this.wheelHandler_, thirdEventListenerParam);
    };
    JsScroll.prototype.scrollManually_ = function (e) {
        e.preventDefault();
        apply_scroll_1.applyScroll(vector_2d_1.Vector2d.fromWheelEvent(e), e.target);
    };
    JsScroll.prototype.destroy = function () {
        this.initializationCount_--;
        if (this.initializationCount_ === 0) {
            window.removeEventListener('wheel', this.wheelHandler_, thirdEventListenerParam);
        }
    };
    return JsScroll;
}());
var jsScroll = new JsScroll();
exports.jsScroll = jsScroll;
//# sourceMappingURL=js-scroll.js.map