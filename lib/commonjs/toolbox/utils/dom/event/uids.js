"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uids = void 0;
var dynamic_default_1 = require("../../map/dynamic-default");
var built_ins_1 = require("./built-ins");
var get_symbol_string_1 = require("../../symbol/get-symbol-string");
var uid = 0;
var uids = dynamic_default_1.DynamicDefaultMap.usingFunction(function (eventType) {
    var eventString = get_symbol_string_1.getSymbolString(eventType);
    return built_ins_1.builtIns.has(eventType) ? eventString : "CustomEvent_" + uid++;
});
exports.uids = uids;
//# sourceMappingURL=uids.js.map