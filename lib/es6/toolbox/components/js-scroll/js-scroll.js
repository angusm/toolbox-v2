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
        this.wheelHandler_ = function (e) {
            _this.scrollManually_(e);
            return false;
        };
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
        applyScroll(Vector2d.fromWheelEvent(e), {
            target: e.target,
            applyImmediately: true,
        });
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