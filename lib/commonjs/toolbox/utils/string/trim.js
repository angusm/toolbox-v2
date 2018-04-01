"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lstrip_1 = require("./lstrip");
var rstrip_1 = require("./rstrip");
function trim(value) {
    return lstrip_1.lstrip(rstrip_1.rstrip(value));
}
exports.trim = trim;
//# sourceMappingURL=trim.js.map