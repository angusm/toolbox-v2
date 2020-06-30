"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleStringToMap = void 0;
var trim_1 = require("../../string/trim");
var contains_1 = require("../../string/contains");
var VALUES_TO_TRIM = [' ', '\n', '\t'];
function styleStringToMap(styleString) {
    if (typeof styleString !== 'string') {
        console.warn("A non-string value \"" + styleString + "\" (tyepof " + typeof styleString + ") " +
            "was provided to styleStringToMap");
        return new Map();
    }
    return styleString.split(';')
        .map(function (propertyStylePair) { return trim_1.trim(propertyStylePair, VALUES_TO_TRIM); })
        .filter(function (propertyStylePair) {
        if (contains_1.contains(propertyStylePair, ':')) {
            return true;
        }
        else {
            if (propertyStylePair !== '') {
                console.warn("Invalid property-style pair provided to styleStringToMap " +
                    ("\"" + propertyStylePair + "\""));
            }
            return false;
        }
    })
        .map(function (propertyStylePair) { return propertyStylePair.split(':'); })
        .map(function (splitPieces) { return [splitPieces[0], splitPieces.slice(1).join(':')]; })
        .map(function (pair) { return pair.map(function (value) { return trim_1.trim(value, VALUES_TO_TRIM); }); })
        .reduce(function (result, _a) {
        var property = _a[0], style = _a[1];
        result.set(property, style);
        return result;
    }, new Map());
}
exports.styleStringToMap = styleStringToMap;
//# sourceMappingURL=style-string-to-map.js.map