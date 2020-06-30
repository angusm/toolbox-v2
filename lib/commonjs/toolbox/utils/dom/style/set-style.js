"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStyle = void 0;
var user_agent_1 = require("../../user-agent/user-agent");
var IMPORTANT = '!important';
var IMPORTANT_LENGTH = 10;
var browser = user_agent_1.UserAgent.getBrowser();
function setStyle(element, rawStyle, rawValue) {
    var isImportant = rawValue.slice(-IMPORTANT_LENGTH) === IMPORTANT;
    var important = isImportant ? 'important' : '';
    var parsedValue = isImportant ? rawValue.slice(0, -IMPORTANT_LENGTH) : rawValue;
    var supportedProperty = browser.getSupportedStyleProperty(rawStyle);
    var supportedValue = browser.getSupportedStyleValue(rawStyle, parsedValue);
    element.style.setProperty(supportedProperty, supportedValue, important);
}
exports.setStyle = setStyle;
//# sourceMappingURL=set-style.js.map