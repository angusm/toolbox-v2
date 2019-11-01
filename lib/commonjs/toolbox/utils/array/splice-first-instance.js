"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function spliceFirstInstance(values, value) {
    var index = values.indexOf(value);
    if (index !== -1) {
        return values.splice(index, 1);
    }
    else {
        return [];
    }
}
exports.spliceFirstInstance = spliceFirstInstance;
//# sourceMappingURL=splice-first-instance.js.map