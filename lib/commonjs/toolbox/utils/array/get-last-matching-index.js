"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastMatchingIndex = void 0;
var are_equal_1 = require("../are-equal");
var zip_1 = require("./zip");
function getLastMatchingIndex() {
    var lists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lists[_i] = arguments[_i];
    }
    var zippedValues = zip_1.zip.apply(void 0, lists);
    var matchIndex;
    for (matchIndex = 0; matchIndex < zippedValues.length; matchIndex++) {
        if (!are_equal_1.areEqual.apply(void 0, zippedValues[matchIndex])) {
            return matchIndex - 1;
        }
    }
    return matchIndex - 1;
}
exports.getLastMatchingIndex = getLastMatchingIndex;
//# sourceMappingURL=get-last-matching-index.js.map