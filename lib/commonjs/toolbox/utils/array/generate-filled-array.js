"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilledArray = void 0;
var defaultDefaultValueFn = function () { return null; };
function generateFilledArray(length, defaultValueFn) {
    if (defaultValueFn === void 0) { defaultValueFn = defaultDefaultValueFn; }
    var result = new Array(length);
    for (var i = 0; i < length; i++) {
        result[i] = defaultValueFn(i);
    }
    return result;
}
exports.generateFilledArray = generateFilledArray;
//# sourceMappingURL=generate-filled-array.js.map