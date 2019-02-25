import { trim } from "../../string/trim";
function styleStringToMap(styleString) {
    return styleString.split(';')
        .map(function (propertyStylePair) { return propertyStylePair.split(':'); })
        .map(function (pair) { return pair.map(function (value) { return trim(value, [' ', '\n', '\t']); }); })
        .reduce(function (result, _a) {
        var property = _a[0], style = _a[1];
        result.set(property, style);
        return result;
    }, new Map());
}
export { styleStringToMap };
//# sourceMappingURL=style-string-to-map.js.map