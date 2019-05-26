import { contains } from '../../string/contains';
import { USER_AGENT_STRING } from '../string';
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
        var _b = offsets.find(function (offset) { return contains(USER_AGENT_STRING, offset[0]); }), browserName = _b[0], offsetToVersionNumber = _b[1];
        var startIndex = USER_AGENT_STRING.indexOf(browserName) + offsetToVersionNumber;
        var rawVersion = USER_AGENT_STRING.substring(startIndex);
        var trimmedVersion = rawVersion
            .split(';')[0]
            .split(' ')[0]
            .split(')')[0];
        return parseFloat(trimmedVersion);
    };
    Browser.getMajorVersion = function () {
        return Math.floor(this.getVersion());
    };
    return Browser;
}());
export { Browser };
//# sourceMappingURL=base.js.map