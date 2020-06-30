"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFirstInstance = void 0;
function removeFirstInstance(values, value) {
    return __spreadArrays(values.slice(0, values.indexOf(value)), values.slice(values.indexOf(value) + 1));
}
exports.removeFirstInstance = removeFirstInstance;
//# sourceMappingURL=remove-first-instance.js.map