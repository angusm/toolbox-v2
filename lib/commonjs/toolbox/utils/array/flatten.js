"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flatten(values) {
    return values.reduce(function (result, subArray) { return result.concat(subArray); }, []);
}
exports.flatten = flatten;
//# sourceMappingURL=flatten.js.map