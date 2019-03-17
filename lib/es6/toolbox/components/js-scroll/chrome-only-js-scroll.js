import { UserAgent } from "../../utils/user-agent/user-agent";
import { jsScroll } from "./js-scroll";
import { Chrome } from "../../utils/user-agent/browser/chrome";
var ChromeOnlyJsScroll = (function () {
    function ChromeOnlyJsScroll() {
    }
    ChromeOnlyJsScroll.prototype.init = function () {
        if (UserAgent.getBrowser() === Chrome) {
            jsScroll.init();
        }
    };
    ChromeOnlyJsScroll.prototype.destroy = function () {
        if (UserAgent.getBrowser() === Chrome) {
            jsScroll.destroy();
        }
    };
    return ChromeOnlyJsScroll;
}());
var chromeOnlyJsScroll = new ChromeOnlyJsScroll();
export { chromeOnlyJsScroll };
//# sourceMappingURL=chrome-only-js-scroll.js.map