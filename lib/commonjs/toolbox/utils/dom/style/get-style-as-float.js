"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("./get-style");
function getStyleAsFloat(element, style) {
    var parsedOpacity = parseFloat(get_style_1.getStyle(element, style));
    return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}
exports.getStyleAsFloat = getStyleAsFloat;
//# sourceMappingURL=get-style-as-float.js.map