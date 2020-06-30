"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEach = void 0;
function forEach(iterableIterator, callback) {
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        callback(nextEntry.value);
        nextEntry = iterableIterator.next();
    }
}
exports.forEach = forEach;
//# sourceMappingURL=for-each.js.map