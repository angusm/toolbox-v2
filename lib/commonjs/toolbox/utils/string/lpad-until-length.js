"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lpadUntilLength = void 0;
var build_string_of_length_1 = require("./build-string-of-length");
function lpadUntilLength(valueToPad, lengthToPadTo, charactersToPadWith) {
    if (charactersToPadWith === void 0) { charactersToPadWith = ' '; }
    var missingLength = lengthToPadTo - valueToPad.length;
    if (missingLength > 0) {
        return "" + build_string_of_length_1.buildStringOfLength(missingLength, charactersToPadWith) +
            ("" + valueToPad);
    }
    else {
        return valueToPad;
    }
}
exports.lpadUntilLength = lpadUntilLength;
//# sourceMappingURL=lpad-until-length.js.map