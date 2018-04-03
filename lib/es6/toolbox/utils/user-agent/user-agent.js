import { Dimensions2d } from "../math/geometry/dimensions-2d";
import { Firefox } from "./browser/firefox";
import { Safari } from "./browser/safari";
import { Chrome } from "./browser/chrome";
import { IE } from "./browser/ie";
import { Edge } from "./browser/edge";
import { Opera } from "./browser/opera";
import { USER_AGENT_STRING } from "./string";
import { Windows8_1 } from "./os/windows-8-1";
import { WindowsServer2003 } from "./os/windows-server-2003";
import { WindowsVista } from "./os/windows-vista";
import { WindowsXP } from "./os/windows-xp";
import { WindowsME } from "./os/windows-me";
import { Windows2000 } from "./os/windows-2000";
import { Windows98 } from "./os/windows-98";
import { Windows95 } from "./os/windows-95";
import { Windows10 } from "./os/windows-10";
import { Windows8 } from "./os/windows-8";
import { Windows7 } from "./os/windows-7";
import { Unix } from "./os/unix";
import { Sun } from "./os/sun";
import { QNX } from "./os/qnx";
import { OSX } from "./os/osx";
import { OpenBSD } from "./os/open-bsd";
import { Mac } from "./os/mac";
import { Linux } from "./os/linux";
import { iOS } from "./os/ios";
import { BeOS } from "./os/beos";
import { Android } from "./os/android";
var browsers = [
    Opera,
    Edge,
    IE,
    Chrome,
    Safari,
    Firefox,
];
var operatingSystems = [
    Android,
    BeOS,
    iOS,
    Linux,
    Mac,
    OpenBSD,
    OSX,
    QNX,
    Sun,
    Unix,
    Windows7,
    Windows8,
    Windows8_1,
    Windows10,
    Windows95,
    Windows98,
    Windows2000,
    WindowsME,
    WindowsServer2003,
    WindowsVista,
    WindowsXP,
];
var UserAgent = (function () {
    function UserAgent() {
    }
    UserAgent.getScreenSize = function () {
        if (!window.screen) {
            return null;
        }
        return new Dimensions2d(window.screen.width, window.screen.height);
    };
    UserAgent.getBrowser = function () {
        return browsers.find(function (browser) { return browser.isCurrentBrowser(); });
    };
    UserAgent.isMobile = function () {
        return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(USER_AGENT_STRING);
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
        return operatingSystems.find(function (os) { return os.isCurrentOS(); });
    };
    return UserAgent;
}());
export { UserAgent };
//# sourceMappingURL=user-agent.js.map