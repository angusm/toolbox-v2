"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function insert(values, value, index) {
    for (var i = values.length; i > index; i--) {
        values[i] = values[i - 1];
    }
    values[index] = value;
    return values;
}
exports.insert = insert;
//# sourceMappingURL=insert.js.map