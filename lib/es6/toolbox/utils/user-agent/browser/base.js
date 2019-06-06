import { contains } from '../../string/contains';
import { USER_AGENT_STRING } from '../string';
import { MultiValueMap } from "../../map/multi-value";
import { map } from '../../iterable-iterator/map';
import { isDefined } from "../../is-defined";
import { reverseMap } from "../../map/reverse-map";
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
    Browser.getSupportedStyleValue = function (genericStyleProperty, genericStyleValue) {
        var supportedValue = this.genericStyleValueToSupported_
            .get([genericStyleProperty, genericStyleValue]);
        return isDefined(supportedValue) ? supportedValue : genericStyleValue;
    };
    Browser.getGenericStyleValue = function (genericStyleProperty, supportedStyleValue) {
        var genericValue = this.getSupportedStyleValueToGenericMap_()
            .get([genericStyleProperty, supportedStyleValue]);
        return isDefined(genericValue) ? genericValue : supportedStyleValue;
    };
    Browser.getSupportedStyleProperty = function (genericStyleProperty) {
        var supportedProperty = this.genericStylePropertyToSupported_.get(genericStyleProperty);
        return isDefined(supportedProperty) ?
            supportedProperty : genericStyleProperty;
    };
    Browser.getGenericStyleProperty = function (supportedStyleProperty) {
        var genericProperty = this.getSupportedStylePropertyToGenericMap_().get(supportedStyleProperty);
        return isDefined(genericProperty) ?
            genericProperty : supportedStyleProperty;
    };
    Browser.getSupportedStyleValueToGenericMap_ = function () {
        if (!this.supportedStyleValueToGeneric_) {
            this.supportedStyleValueToGeneric_ =
                new MultiValueMap(map(this.genericStyleValueToSupported_.entries(), function (_a) {
                    var _b = _a[0], genericProperty = _b[0], genericValue = _b[1], supportedValue = _a[1];
                    return [[genericProperty, supportedValue], genericValue];
                }).slice());
        }
        return this.supportedStyleValueToGeneric_;
    };
    Browser.getSupportedStylePropertyToGenericMap_ = function () {
        if (!this.supportedStylePropertyToGeneric_) {
            this.supportedStylePropertyToGeneric_ =
                reverseMap(this.genericStylePropertyToSupported_);
        }
        return this.supportedStylePropertyToGeneric_;
    };
    return Browser;
}());
export { Browser };
//# sourceMappingURL=base.js.map