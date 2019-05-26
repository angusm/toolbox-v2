import { contains } from '../../string/contains';
import { USER_AGENT_STRING } from '../string';
import { webpSupportedBrowsers } from '../feature-support-maps/webp-supported-browsers';
import { webmSupportedBrowsers } from '../feature-support-maps/webm-supported-browsers';
var Browser = (function () {
    function Browser() {
    }
    Browser.getAsCSSModifier = function () {
        return this.name_.toLowerCase().replace(/\s/, '-');
    };
    Browser.getName = function () {
        return this.name_;
    };
    Browser.getUaids_ = function () {
        return this.uaidsWithOffsets_.map(function (_a) {
            var uaid = _a[0], x = _a[1];
            return uaid;
        });
    };
    Browser.isCurrentBrowser = function () {
        return this.getUaids_().some(function (uaid) {
            return contains(USER_AGENT_STRING, uaid);
        });
    };
    Browser.getVersion = function () {
        var _a = this.uaidsWithOffsets_.find(function (_a) {
            var uaid = _a[0], x = _a[1];
            return contains(USER_AGENT_STRING, uaid);
        }), uaid = _a[0], offsets = _a[1];
        var offset = offsets.find(function (offset) {
            return contains(USER_AGENT_STRING, offset[0]);
        });
        var range = [
            USER_AGENT_STRING.indexOf(offset[0]),
            offset[1]
        ];
        var rawVersion = USER_AGENT_STRING.substring(range[0], range[1]);
        var trimmedVersion = rawVersion
            .split(';')[0]
            .split(' ')[0]
            .split(')')[0];
        return parseFloat(trimmedVersion);
    };
    Browser.getMajorVersion = function () {
        return Math.floor(this.getVersion());
    };
    Browser.isSupported_ = function (featureSupportMap) {
        var version = this.getVersion();
        var range = featureSupportMap.get(this);
        return range.contains(version);
    };
    Browser.isWebpSupported = function () {
        return Browser.isSupported_(webpSupportedBrowsers);
    };
    Browser.isWebmSupported = function () {
        return Browser.isSupported_(webmSupportedBrowsers);
    };
    return Browser;
}());
export { Browser };
//# sourceMappingURL=base.js.map