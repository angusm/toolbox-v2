"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var are_equal_1 = require("../are-equal");
var to_bool_1 = require("../to-bool");
var zip_1 = require("./zip");
function areArrayValuesEqual() {
    var lists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lists[_i] = arguments[_i];
    }
    if (!lists.every(function (list) { return to_bool_1.toBool(list); })) {
        return false;
    }
    if (!are_equal_1.areEqual.apply(void 0, lists.map(function (list) { return list.length; }))) {
        return false;
    }
    return zip_1.zip.apply(void 0, lists).every(function (zippedValues) { return are_equal_1.areEqual.apply(void 0, zippedValues); });
}
exports.areArrayValuesEqual = areArrayValuesEqual;
//# sourceMappingURL=are-array-values-equal.js.map