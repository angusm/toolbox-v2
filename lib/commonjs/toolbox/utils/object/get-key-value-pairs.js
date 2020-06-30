"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyValuePairs = void 0;
var get_as_list_1 = require("./get-as-list");
var zip_1 = require("../array/zip");
function getKeyValuePairs(value) {
    return zip_1.zip(Object.keys(value), get_as_list_1.getAsList(value));
}
exports.getKeyValuePairs = getKeyValuePairs;
//# sourceMappingURL=get-key-value-pairs.js.map