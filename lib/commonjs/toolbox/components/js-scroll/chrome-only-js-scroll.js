"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_agent_1 = require("../../utils/user-agent/user-agent");
var js_scroll_1 = require("./js-scroll");
var chrome_1 = require("../../utils/user-agent/browser/chrome");
var ChromeOnlyJsScroll = (function () {
    function ChromeOnlyJsScroll() {
    }
    ChromeOnlyJsScroll.prototype.init = function () {
        if (user_agent_1.UserAgent.getBrowser() === chrome_1.Chrome) {
            js_scroll_1.jsScroll.init();
        }
    };
    ChromeOnlyJsScroll.prototype.destroy = function () {
        if (user_agent_1.UserAgent.getBrowser() === chrome_1.Chrome) {
            js_scroll_1.jsScroll.destroy();
        }
    };
    return ChromeOnlyJsScroll;
}());
var chromeOnlyJsScroll = new ChromeOnlyJsScroll();
exports.chromeOnlyJsScroll = chromeOnlyJsScroll;
//# sourceMappingURL=chrome-only-js-scroll.js.map