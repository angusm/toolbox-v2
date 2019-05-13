"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reduce(iterableIterator, callback, initialValue) {
    var value = initialValue;
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        value = callback(value, nextEntry.value);
        nextEntry = iterableIterator.next();
    }
    return value;
}
exports.reduce = reduce;
//# sourceMappingURL=reduce.js.map