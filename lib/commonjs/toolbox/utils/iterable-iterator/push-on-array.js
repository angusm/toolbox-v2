"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushOnArray = void 0;
function pushOnArray(array, iterableIterator) {
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        array.push(nextEntry.value);
        nextEntry = iterableIterator.next();
    }
    return array;
}
exports.pushOnArray = pushOnArray;
//# sourceMappingURL=push-on-array.js.map