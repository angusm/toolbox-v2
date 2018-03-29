"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MappedIterator = (function () {
    function MappedIterator(iterable, mapFunction) {
        this.iterator = iterable;
        this.mapFunction = mapFunction;
    }
    MappedIterator.prototype.next = function () {
        var nextValue = this.iterator.next();
        return {
            done: nextValue.done,
            value: this.mapFunction(nextValue.value)
        };
    };
    return MappedIterator;
}());
exports.MappedIterator = MappedIterator;
//# sourceMappingURL=mapped-iterator.js.map