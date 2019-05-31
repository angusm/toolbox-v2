import { buildStringOfLength } from "./build-string-of-length";
function lpadUntilLength(valueToPad, lengthToPadTo, charactersToPadWith) {
    if (charactersToPadWith === void 0) { charactersToPadWith = ' '; }
    var missingLength = lengthToPadTo - valueToPad.length;
    if (missingLength > 0) {
        return "" + buildStringOfLength(missingLength, charactersToPadWith) +
            ("" + valueToPad);
    }
    else {
        return valueToPad;
    }
}
export { lpadUntilLength };
//# sourceMappingURL=lpad-until-length.js.map