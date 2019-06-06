import { ComputedStyleService } from "./computed-style-service";
import { UserAgent } from "../../user-agent/user-agent";
var computedStyleService = ComputedStyleService.getSingleton();
var browser = UserAgent.getBrowser();
function getStyle(element, style) {
    var supportedStyleProperty = browser.getSupportedStyleProperty(style);
    var rawValue = computedStyleService.getComputedStyle(element)
        .getPropertyValue(supportedStyleProperty);
    return browser.getGenericStyleValue(style, rawValue);
}
export { getStyle };
//# sourceMappingURL=get-style.js.map