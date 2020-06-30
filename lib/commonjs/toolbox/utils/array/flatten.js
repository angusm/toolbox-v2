"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = void 0;
function flatten(values) {
    return values.reduce(function (result, subArray) { return result.concat(subArray); }, []);
}
exports.flatten = flatten;
//# sourceMappingURL=flatten.js.map