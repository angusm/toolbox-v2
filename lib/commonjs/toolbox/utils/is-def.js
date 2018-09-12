"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_defined_1 = require("./is-defined");
function isDef(value) {
    console.warn("Toolbox's isDef is deprecated, please use the better named " +
        "isDefined instead");
    return is_defined_1.isDefined(value);
}
exports.isDef = isDef;
//# sourceMappingURL=is-def.js.map