"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMapAsSwitch = void 0;
var default_symbol_1 = require("./default-symbol");
function runMapAsSwitch(map, key) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (map.has(key)) {
        return map.get(key).apply(void 0, args);
    }
    else {
        return map.get(default_symbol_1.defaultSymbol).apply(void 0, args);
    }
}
exports.runMapAsSwitch = runMapAsSwitch;
//# sourceMappingURL=run-map-as-switch.js.map