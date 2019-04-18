import { trim } from "../../string/trim";
import { contains } from "../../string/contains";
function styleStringToMap(styleString) {
    if (typeof styleString !== 'string') {
        console.warn("A non-string value \"" + styleString + "\" (tyepof " + typeof styleString + ") " +
            "was provided to styleStringToMap");
        return new Map();
    }
    return styleString.split(';')
        .filter(function (propertyStylePair) {
        if (contains(propertyStylePair, ':')) {
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
        .map(function (pair) { return pair.map(function (value) { return trim(value, [' ', '\n', '\t']); }); })
        .reduce(function (result, _a) {
        var property = _a[0], style = _a[1];
        result.set(property, style);
        return result;
    }, new Map());
}
export { styleStringToMap };
//# sourceMappingURL=style-string-to-map.js.map