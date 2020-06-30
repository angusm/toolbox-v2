"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgent = void 0;
var dimensions_2d_1 = require("../math/geometry/dimensions-2d");
var firefox_1 = require("./browser/firefox");
var safari_1 = require("./browser/safari");
var chrome_1 = require("./browser/chrome");
var ie_1 = require("./browser/ie");
var edge_1 = require("./browser/edge");
var opera_1 = require("./browser/opera");
var string_1 = require("./string");
var windows_8_1_1 = require("./os/windows-8-1");
var windows_server_2003_1 = require("./os/windows-server-2003");
var windows_vista_1 = require("./os/windows-vista");
var windows_xp_1 = require("./os/windows-xp");
var windows_me_1 = require("./os/windows-me");
var windows_2000_1 = require("./os/windows-2000");
var windows_98_1 = require("./os/windows-98");
var windows_95_1 = require("./os/windows-95");
var windows_10_1 = require("./os/windows-10");
var windows_8_1 = require("./os/windows-8");
var windows_7_1 = require("./os/windows-7");
var unix_1 = require("./os/unix");
var sun_1 = require("./os/sun");
var qnx_1 = require("./os/qnx");
var osx_1 = require("./os/osx");
var open_bsd_1 = require("./os/open-bsd");
var mac_1 = require("./os/mac");
var linux_1 = require("./os/linux");
var ios_1 = require("./os/ios");
var beos_1 = require("./os/beos");
var android_1 = require("./os/android");
var is_defined_1 = require("../is-defined");
var unknown_1 = require("./browser/unknown");
var unknown_2 = require("./os/unknown");
var browsers = [
    opera_1.Opera,
    edge_1.Edge,
    ie_1.IE,
    chrome_1.Chrome,
    safari_1.Safari,
    firefox_1.Firefox,
];
var operatingSystems = [
    android_1.Android,
    beos_1.BeOS,
    ios_1.iOS,
    linux_1.Linux,
    mac_1.Mac,
    open_bsd_1.OpenBSD,
    osx_1.OSX,
    qnx_1.QNX,
    sun_1.Sun,
    unix_1.Unix,
    windows_7_1.Windows7,
    windows_8_1.Windows8,
    windows_8_1_1.Windows8_1,
    windows_10_1.Windows10,
    windows_95_1.Windows95,
    windows_98_1.Windows98,
    windows_2000_1.Windows2000,
    windows_me_1.WindowsME,
    windows_server_2003_1.WindowsServer2003,
    windows_vista_1.WindowsVista,
    windows_xp_1.WindowsXP,
];
var browser = null;
var os = null;
var isMobile = null;
var UserAgent = (function () {
    function UserAgent() {
    }
    UserAgent.getScreenSize = function () {
        if (!window.screen) {
            return null;
        }
        return new dimensions_2d_1.Dimensions2d(window.screen.width, window.screen.height);
    };
    UserAgent.getBrowser = function () {
        if (browser === null) {
            var matchingBrowser = browsers.find(function (candidate) { return candidate.isCurrentBrowser(); });
            browser = is_defined_1.isDefined(matchingBrowser) ? matchingBrowser : unknown_1.UnknownBrowser;
        }
        return browser;
    };
    UserAgent.isMobile = function () {
        if (isMobile === null) {
            isMobile =
                /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(string_1.USER_AGENT_STRING);
        }
        return isMobile;
    };
    UserAgent.isCookieEnabled = function () {
        var cookieEnabled = (window.navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            return (document.cookie.indexOf('testcookie') !== -1) ? true : false;
        }
        else {
            return cookieEnabled;
        }
    };
    UserAgent.getOS = function () {
        if (os === null) {
            var matchingOs = operatingSystems.find(function (os) { return os.isCurrentOS(); });
            os = is_defined_1.isDefined(matchingOs) ? matchingOs : unknown_2.UnknownOS;
        }
        return os;
    };
    return UserAgent;
}());
exports.UserAgent = UserAgent;
//# sourceMappingURL=user-agent.js.map