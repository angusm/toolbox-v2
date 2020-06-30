"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpacity = void 0;
var get_style_as_float_1 = require("./get-style-as-float");
function getOpacity(element) {
    return get_style_as_float_1.getStyleAsFloat(element, 'opacity');
}
exports.getOpacity = getOpacity;
//# sourceMappingURL=get-opacity.js.map