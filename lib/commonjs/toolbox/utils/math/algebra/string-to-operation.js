"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToOperation = void 0;
var operation_1 = require("./operation");
var stringToOperation = new Map([
    ['*', operation_1.Multiply],
    ['/', operation_1.Divide],
    ['+', operation_1.Add],
    ['-', operation_1.Subtract],
]);
exports.stringToOperation = stringToOperation;
//# sourceMappingURL=string-to-operation.js.map