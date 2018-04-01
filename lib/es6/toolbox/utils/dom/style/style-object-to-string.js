import { getKeyValuePairs } from '../../object/get-key-value-pairs';
function styleObjectToString(styleObject) {
    var styles = getKeyValuePairs(styleObject)
        .map(function (kvp) { return kvp.join(': '); })
        .join('; ');
    return styles + ";";
}
export { styleObjectToString };
//# sourceMappingURL=style-object-to-string.js.map