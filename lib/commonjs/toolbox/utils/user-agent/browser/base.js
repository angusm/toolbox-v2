"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contains_1 = require("../../string/contains");
var string_1 = require("../string");
var multi_value_1 = require("../../map/multi-value");
var map_1 = require("../../iterable-iterator/map");
var is_defined_1 = require("../../is-defined");
var reverse_map_1 = require("../../map/reverse-map");
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
            return contains_1.contains(string_1.USER_AGENT_STRING, uaid);
        });
    };
    Browser.getVersion = function () {
        var _a = this.uaidsWithOffsets_.find(function (_a) {
            var uaid = _a[0], x = _a[1];
            return contains_1.contains(string_1.USER_AGENT_STRING, uaid);
        }), uaid = _a[0], offsets = _a[1];
        var _b = offsets.find(function (offset) { return contains_1.contains(string_1.USER_AGENT_STRING, offset[0]); }), browserName = _b[0], offsetToVersionNumber = _b[1];
        var startIndex = string_1.USER_AGENT_STRING.indexOf(browserName) + offsetToVersionNumber;
        var rawVersion = string_1.USER_AGENT_STRING.substring(startIndex);
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
        return is_defined_1.isDefined(supportedValue) ? supportedValue : genericStyleValue;
    };
    Browser.getGenericStyleValue = function (genericStyleProperty, supportedStyleValue) {
        var genericValue = this.getSupportedStyleValueToGenericMap_()
            .get([genericStyleProperty, supportedStyleValue]);
        return is_defined_1.isDefined(genericValue) ? genericValue : supportedStyleValue;
    };
    Browser.getSupportedStyleProperty = function (genericStyleProperty) {
        var supportedProperty = this.genericStylePropertyToSupported_.get(genericStyleProperty);
        return is_defined_1.isDefined(supportedProperty) ?
            supportedProperty : genericStyleProperty;
    };
    Browser.getGenericStyleProperty = function (supportedStyleProperty) {
        var genericProperty = this.getSupportedStylePropertyToGenericMap_().get(supportedStyleProperty);
        return is_defined_1.isDefined(genericProperty) ?
            genericProperty : supportedStyleProperty;
    };
    Browser.getSupportedStyleValueToGenericMap_ = function () {
        if (!this.supportedStyleValueToGeneric_) {
            this.supportedStyleValueToGeneric_ =
                new multi_value_1.MultiValueMap(map_1.map(this.genericStyleValueToSupported_.entries(), function (_a) {
                    var _b = _a[0], genericProperty = _b[0], genericValue = _b[1], supportedValue = _a[1];
                    return [[genericProperty, supportedValue], genericValue];
                }).slice());
        }
        return this.supportedStyleValueToGeneric_;
    };
    Browser.getSupportedStylePropertyToGenericMap_ = function () {
        if (!this.supportedStylePropertyToGeneric_) {
            this.supportedStylePropertyToGeneric_ =
                reverse_map_1.reverseMap(this.genericStylePropertyToSupported_);
        }
        return this.supportedStylePropertyToGeneric_;
    };
    return Browser;
}());
exports.Browser = Browser;
//# sourceMappingURL=base.js.map