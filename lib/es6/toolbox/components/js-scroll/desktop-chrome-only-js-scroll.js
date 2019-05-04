import { UserAgent } from "../../utils/user-agent/user-agent";
import { chromeOnlyJsScroll } from "./chrome-only-js-scroll";
var DesktopChromeOnlyJsScroll = (function () {
    function DesktopChromeOnlyJsScroll() {
    }
    DesktopChromeOnlyJsScroll.prototype.init = function () {
        if (!UserAgent.isMobile()) {
            chromeOnlyJsScroll.init();
        }
    };
    DesktopChromeOnlyJsScroll.prototype.destroy = function () {
        if (!UserAgent.isMobile()) {
            chromeOnlyJsScroll.destroy();
        }
    };
    return DesktopChromeOnlyJsScroll;
}());
var desktopChromeOnlyJsScroll = new DesktopChromeOnlyJsScroll();
export { desktopChromeOnlyJsScroll };
//# sourceMappingURL=desktop-chrome-only-js-scroll.js.map