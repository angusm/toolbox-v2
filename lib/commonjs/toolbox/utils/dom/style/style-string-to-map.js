"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trim_1 = require("../../string/trim");
function styleStringToMap(styleString) {
    return styleString.split(';')
        .map(function (propertyStylePair) { return propertyStylePair.split(':'); })
        .map(function (pair) { return pair.map(function (value) { return trim_1.trim(value, [' ', '\n', '\t']); }); })
        .reduce(function (result, _a) {
        var property = _a[0], style = _a[1];
        result.set(property, style);
        return result;
    }, new Map());
}
exports.styleStringToMap = styleStringToMap;
//# sourceMappingURL=style-string-to-map.js.map