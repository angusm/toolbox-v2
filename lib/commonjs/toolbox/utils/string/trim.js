"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lstrip_1 = require("./lstrip");
var rstrip_1 = require("./rstrip");
function trim(value, characters) {
    if (characters === void 0) { characters = [' ']; }
    return lstrip_1.lstrip(rstrip_1.rstrip(value, characters), characters);
}
exports.trim = trim;
//# sourceMappingURL=trim.js.map