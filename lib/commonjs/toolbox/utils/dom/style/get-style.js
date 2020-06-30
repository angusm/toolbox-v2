"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyle = void 0;
var computed_style_service_1 = require("./computed-style-service");
var user_agent_1 = require("../../user-agent/user-agent");
var computedStyleService = computed_style_service_1.ComputedStyleService.getSingleton();
var browser = user_agent_1.UserAgent.getBrowser();
function getStyle(element, style) {
    var supportedStyleProperty = browser.getSupportedStyleProperty(style);
    var rawValue = computedStyleService.getComputedStyle(element)
        .getPropertyValue(supportedStyleProperty);
    return browser.getGenericStyleValue(style, rawValue);
}
exports.getStyle = getStyle;
//# sourceMappingURL=get-style.js.map