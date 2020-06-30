"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
function filter(iterableIterator, filterFn) {
    var result = [];
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        if (filterFn(nextEntry.value)) {
            result.push(nextEntry.value);
        }
        nextEntry = iterableIterator.next();
    }
    return result;
}
exports.filter = filter;
//# sourceMappingURL=filter.js.map