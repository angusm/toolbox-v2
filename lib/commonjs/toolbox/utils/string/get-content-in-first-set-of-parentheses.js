"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentInFirstSetOfParentheses = void 0;
var service_1 = require("../error/service");
function getContentInFirstSetOfParentheses(s) {
    if (s.indexOf('(') === -1 && s.indexOf(')') === -1) {
        return '';
    }
    if (s.indexOf('(') === -1 && s.indexOf(')') !== -1) {
        service_1.ErrorService.throw("Value passed to getContentInFirstSetOfParentheses() has no " +
            "opening parenthesis");
        return '';
    }
    var startIndex = s.indexOf('(') + 1;
    var openParenthesesCount = 1;
    var currentIndex = startIndex;
    while (openParenthesesCount > 0 && currentIndex < s.length) {
        var character = s[currentIndex];
        if (character === ')') {
            openParenthesesCount--;
        }
        else if (character === '(') {
            openParenthesesCount++;
        }
        currentIndex++;
    }
    if (openParenthesesCount > 0) {
        service_1.ErrorService.throw("Value passed to getContentInFirstSetOfParentheses() has uneven " +
            "opening/closing parentheses");
        return '';
    }
    else {
        var endIndex = currentIndex - 1;
        return s.slice(startIndex, endIndex);
    }
}
exports.getContentInFirstSetOfParentheses = getContentInFirstSetOfParentheses;
//# sourceMappingURL=get-content-in-first-set-of-parentheses.js.map