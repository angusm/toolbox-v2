import { Vector2d } from "../../utils/math/geometry/vector-2d";
import { applyScroll } from "../../utils/dom/position/apply-scroll";
import { UserAgent } from "../../utils/user-agent/user-agent";
import { IE } from "../../utils/user-agent/browser/ie";
var thirdEventListenerParam = UserAgent.getBrowser() === IE ?
    true : { passive: false, capture: true, once: false };
var JsScroll = (function () {
    function JsScroll() {
        var _this = this;
        this.initializationCount_ = 0;
        this.wheelHandler_ = function (e) { return _this.scrollManually_(e); };
    }
    JsScroll.prototype.init = function () {
        if (this.initializationCount_ === 0) {
            window.addEventListener('wheel', this.wheelHandler_, thirdEventListenerParam);
        }
        this.initializationCount_++;
    };
    JsScroll.prototype.scrollManually_ = function (e) {
        e.preventDefault();
        applyScroll(Vector2d.fromWheelEvent(e));
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
export { jsScroll };
//# sourceMappingURL=js-scroll.js.map