"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("../map/dynamic-default");
var uid_ = 0;
var uids = dynamic_default_1.DynamicDefaultMap.usingFunction(function (eventType) { return "CustomEvent_" + uid_++; });
exports.uids = uids;
//# sourceMappingURL=uids.js.map