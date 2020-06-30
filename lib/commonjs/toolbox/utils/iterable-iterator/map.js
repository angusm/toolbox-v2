"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
function map(iterableIterator, callback) {
    var result = [];
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        result.push(callback(nextEntry.value));
        nextEntry = iterableIterator.next();
    }
    return result;
}
exports.map = map;
//# sourceMappingURL=map.js.map