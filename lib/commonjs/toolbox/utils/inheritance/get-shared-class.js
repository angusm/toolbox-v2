"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedClass = void 0;
var get_ancestor_classes_1 = require("./get-ancestor-classes");
var zip_1 = require("../array/zip");
var are_equal_1 = require("../are-equal");
function getSharedClass() {
    var Classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Classes[_i] = arguments[_i];
    }
    return zip_1.zip.apply(void 0, Classes.map(function (CurrentClass) {
        var ancestorClasses = get_ancestor_classes_1.getAncestorClasses(CurrentClass);
        return __spreadArrays([CurrentClass], ancestorClasses).reverse();
    })).reverse()
        .find(function (ancestors) { return are_equal_1.areEqual.apply(void 0, ancestors); })[0];
}
exports.getSharedClass = getSharedClass;
//# sourceMappingURL=get-shared-class.js.map