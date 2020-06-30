"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desktopChromeOnlyJsScroll = void 0;
var user_agent_1 = require("../../utils/user-agent/user-agent");
var chrome_only_js_scroll_1 = require("./chrome-only-js-scroll");
var DesktopChromeOnlyJsScroll = (function () {
    function DesktopChromeOnlyJsScroll() {
    }
    DesktopChromeOnlyJsScroll.prototype.init = function () {
        if (!user_agent_1.UserAgent.isMobile()) {
            chrome_only_js_scroll_1.chromeOnlyJsScroll.init();
        }
    };
    DesktopChromeOnlyJsScroll.prototype.destroy = function () {
        if (!user_agent_1.UserAgent.isMobile()) {
            chrome_only_js_scroll_1.chromeOnlyJsScroll.destroy();
        }
    };
    return DesktopChromeOnlyJsScroll;
}());
var desktopChromeOnlyJsScroll = new DesktopChromeOnlyJsScroll();
exports.desktopChromeOnlyJsScroll = desktopChromeOnlyJsScroll;
//# sourceMappingURL=desktop-chrome-only-js-scroll.js.map