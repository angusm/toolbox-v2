"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyleAsInt = void 0;
var get_style_1 = require("./get-style");
function getStyleAsInt(element, style) {
    var parsedOpacity = parseInt(get_style_1.getStyle(element, style));
    return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}
exports.getStyleAsInt = getStyleAsInt;
//# sourceMappingURL=get-style-as-int.js.map