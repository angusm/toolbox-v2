"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse = void 0;
function reverse(s) {
    var result = '';
    for (var i = s.length - 1; i >= 0; i--) {
        result += s[i];
    }
    return result;
}
exports.reverse = reverse;
//# sourceMappingURL=reverse.js.map