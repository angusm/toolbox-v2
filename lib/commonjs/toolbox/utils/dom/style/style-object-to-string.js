"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleObjectToString = void 0;
var get_key_value_pairs_1 = require("../../object/get-key-value-pairs");
function styleObjectToString(styleObject) {
    var styles = get_key_value_pairs_1.getKeyValuePairs(styleObject)
        .map(function (kvp) { return kvp.join(': '); })
        .join('; ');
    return styles + ";";
}
exports.styleObjectToString = styleObjectToString;
//# sourceMappingURL=style-object-to-string.js.map