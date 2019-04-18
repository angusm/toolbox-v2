"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IMPORTANT = '!important';
var IMPORTANT_LENGTH = 10;
function setStyle(element, style, rawValue) {
    var isImportant = rawValue.slice(-IMPORTANT_LENGTH) === IMPORTANT;
    var important = isImportant ? 'important' : '';
    var value = isImportant ? rawValue.slice(0, -IMPORTANT_LENGTH) : rawValue;
    element.style.setProperty(style, value, important);
}
exports.setStyle = setStyle;
//# sourceMappingURL=set-style.js.map