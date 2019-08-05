"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function some(iterableIterator, filterFn) {
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        if (filterFn(nextEntry.value)) {
            return true;
        }
        nextEntry = iterableIterator.next();
    }
    return false;
}
exports.some = some;
//# sourceMappingURL=some.js.map