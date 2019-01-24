"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_to_operation_1 = require("./string-to-operation");
var reverse_map_1 = require("../../map/reverse-map");
var operationToString = reverse_map_1.reverseMap(string_to_operation_1.stringToOperation);
exports.operationToString = operationToString;
//# sourceMappingURL=operation-to-string.js.map